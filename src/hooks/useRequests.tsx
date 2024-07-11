/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/service";
import { AxiosError } from "axios";
import { gitHubIssues, userProfile } from "../constants/paths";
import { toast } from "react-toastify";

interface useRequestsProps {
  children: ReactNode;
}

interface RequestContextData {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
  posts: PostProps[];
  setPosts: Dispatch<SetStateAction<PostProps[]>>;
  postId: number;
  setPostId: Dispatch<SetStateAction<number>>;
  searchPost: string;
  setSearchPost: Dispatch<SetStateAction<string>>;
}

interface UserProps {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  bio: string;
  followers: number;
}

interface PostProps {
  number: number;
  title: string;
  body: string;
  created_at: string;
}

export const RequestContext = createContext({} as RequestContextData);

function RequestsProvider({ children }: useRequestsProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [postId, setPostId] = useState<number>(0);
  const [searchPost, setSearchPost] = useState<string>("");

  /**
   * Função para obter os dados do perfil de um usuário específico do GitHub.
   *
   * Utiliza `useCallback` para memorizar a instância da função, melhorando a eficiência ao evitar
   * recriações desnecessárias da função durante re-renderizações do componente, exceto quando
   * suas dependências especificadas forem alteradas.
   */
  const getUserProfile = useCallback(async () => {
    await api
      .get<UserProps>(userProfile)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          toast.error("Usuário não encontrado");
        } else {
          toast.error("Erro ao buscar usuário");
        }
      });
  }, [user]);

  /**
   * Função para obter a lista de Issues de um repositório específico do GitHub,
   * e atualiza o estado com os dados recebidos.
   * Em caso de erro na requisição, o estado é atualizado para uma lista vazia.
   *
   * Utiliza `useCallback` para memorizar a instância da função, melhorando a eficiência ao evitar
   * recriações desnecessárias da função durante re-renderizações do componente, exceto quando
   * suas dependências especificadas forem alteradas.
   */
  const getPosts = useCallback(async () => {
    await api
      .get<PostProps[]>(gitHubIssues)
      .then((response) => {
        const allposts = response.data;

        setPosts(allposts);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          toast.error("Erro ao buscar publicações");
        }

        setPosts([]);
      });
  }, [posts]);

  /**
   * Função para obter os dados de uma Issue específica através do seu ID.
   *
   * A função verifica se o `postId` é diferente de zero antes de fazer a requisição.
   * Passando pela verificação, faz uma requisição GET para buscar os dados do post com o ID fornecido.
   */
  const getPostId = async () => {
    if (postId !== 0) {
      await api
        .get(`${gitHubIssues}/${postId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    getPostId();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <RequestContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        posts,
        setPosts,
        postId,
        setPostId,
        searchPost,
        setSearchPost,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

function useRequests() {
  return useContext(RequestContext);
}

export { useRequests, RequestsProvider };
