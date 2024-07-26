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
import {
  gitHubIssues,
  gitRepository,
  searchIssues,
  userProfile,
} from "../constants/paths";
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
  searchPosts: (query?: string) => Promise<void>;
  getPostDetails: (id: number) => Promise<void>;
}

export const RequestContext = createContext({} as RequestContextData);

function RequestsProvider({ children }: useRequestsProps) {
  const defaultUser: UserProps = {
    login: "brnmilano",
    avatar_url: "https://avatars.githubusercontent.com/u/66279500?v=4",
    html_url: "https://avatars.githubusercontent.com",
    name: "Bruno Milano",
    company: "Sem empresa",
    bio: "Desenvolvedor frontend",
    followers: 40,
  };

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<UserProps>(defaultUser);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [searchPost, setSearchPost] = useState<string>("");
  const [postDetails, setPostDetails] = useState<PostDetailsProps>(
    {} as PostDetailsProps
  );

  /**
   * Função para obter os dados do perfil de um usuário específico do GitHub.
   *
   * - `#200` - Atualiza o estado `user` com os dados recebidos.
   * - `#404` - Atualiza o estado `user` para um objeto vazio e exibe um toast de erro.
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
        }

        setUser({} as UserProps);
      });
  }, [user]);

  /**
   * Função para obter a lista de Issues de um repositório específico do GitHub.
   *
   * - `#200` - Atualiza o estado `posts` com os dados recebidos.
   * - `#404` - Atualiza o estado `posts` para uma lista vazia e exibe um toast de erro.
   *
   * Utiliza `useCallback` para memorizar a instância da função, melhorando a eficiência ao evitar
   * recriações desnecessárias da função durante re-renderizações do componente, exceto quando
   * suas dependências especificadas forem alteradas.
   */
  const getPosts = useCallback(async () => {
    setLoading(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [posts]);

  /**
   * Função para buscar as issues de acordo com o parâmetro em um repositório específico do GitHub.
   *
   * - Cria um fake delay de 1 segundo para simular o loading.
   * - `#200` - Atualiza o estado `posts` com os dados recebidos.
   * - `#404` - Atualiza o estado `posts` para uma lista vazia e exibe um toast de erro.
   *
   * @param {string} query - Valor utilizado para pesquisar as issues do repositório.
   *
   * Utiliza `useCallback` para memorizar a instância da função, melhorando a eficiência ao evitar
   * recriações desnecessárias da função durante re-renderizações do componente, exceto quando
   * suas dependências especificadas forem alteradas.
   */
  const searchPosts = useCallback(
    async (query?: string) => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await api
        .get<{ items: PostProps[] }>(
          `${searchIssues}?q=${query}%20repo:${gitRepository}`
        )
        .then((response) => {
          const postsFiltered = response.data.items;

          setPosts(postsFiltered);
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 404) {
            toast.error("Erro ao buscar publicações");
          }

          setPosts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [posts]
  );

  /**
   * Função para obter os dados de uma Issue específica através do seu ID.
   *
   * - Cria um fake delay de 1 segundo para simular o loading.
   * - `#200` - Formata os dados recebidos, adicionando a quantidade de seguidores e login do usuário. Em seguida, atualiza o estado `postDetails` com os dados formatados.
   * - `#404` - Atualiza o estado `postDetails` para um objeto vazio e exibe um toast de erro.
   */
  const getPostDetails = async (id: number) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Comentário com finalidades de estudo.
   * O hook useEffect nos auxilia a lidar com os side-effects (efeitos colaterais)
   * e podemos usá-los também como ciclo de vida do componente.
   *
   * Utiliza o hook useEffect para executar a função `getUserProfile` apenas uma vez,
   * quando o componente for montado.
   *
   * No primeiro parâmetro, passamos a função que será executada, no meu caso, a função `getUserProfile`.
   * No segundo parâmetro, passamos um array vazio, indicando que a função será executada apenas uma vez.
   * Caso o array seja passado vazio, a função será executada sempre que o componente for renderizado.
   * Caso o array tenha alguma dependência, a função será executada sempre que a dependência for alterada.
   */
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
        searchPosts,
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
