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
import { PostDetailsProps, PostProps, UserProps } from "../types";

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
  searchPost: string;
  setSearchPost: Dispatch<SetStateAction<string>>;
  postDetails: PostDetailsProps;
  setPostDetails: Dispatch<SetStateAction<PostDetailsProps>>;
  getPostDetails: (id: number) => Promise<void>;
}

export const RequestContext = createContext({} as RequestContextData);

function RequestsProvider({ children }: useRequestsProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [postDetails, setPostDetails] = useState<PostDetailsProps>(
    {} as PostDetailsProps
  );
  const [searchPost, setSearchPost] = useState<string>("");

  console.log(user.login);

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

        setUser({} as UserProps);
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
  const getPostDetails = async (id: number) => {
    await api
      .get(`${gitHubIssues}/${id}`)
      .then((response) => {
        const postDetailsFormatted = {
          ...response.data,
          followers: user.followers,
          login: user.login,
        };

        setPostDetails(postDetailsFormatted);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          toast.error("Erro ao buscar publicação");
        }

        setPostDetails({} as PostDetailsProps);
      });
  };

  useEffect(() => {
    getUserProfile();
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
        searchPost,
        setSearchPost,
        postDetails,
        setPostDetails,
        getPostDetails,
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
