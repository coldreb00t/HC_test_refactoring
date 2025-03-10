// Объявление типов для модулей
declare module 'react' {
  export interface ReactNode {
    children?: ReactNode;
  }
  
  export type FC<P = {}> = FunctionComponent<P>;
  
  export interface FunctionComponent<P = {}> {
    (props: P): ReactElement | null;
  }
  
  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: any;
  }

  // Хуки React
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function useReducer<R extends React.Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I,
    initializer: (arg: I) => React.ReducerState<R>
  ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useRef<T = undefined>(initialValue: T): { current: T };
  export function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
}

declare module 'react/jsx-runtime';
declare module 'react-router-dom';
declare module 'react-hot-toast';
declare module 'lucide-react';
declare module '@supabase/supabase-js' {
  export interface User {
    id: string;
    app_metadata: {
      provider?: string;
      [key: string]: any;
    };
    user_metadata: {
      role?: string;
      [key: string]: any;
    };
    aud: string;
    created_at: string;
  }

  export interface SupabaseClient {
    auth: {
      getUser(): Promise<{ data: { user: User | null } }>;
      signOut(): Promise<{ error: Error | null }>;
    };
    // Добавьте другие необходимые методы по мере необходимости
  }

  export function createClient(supabaseUrl: string, supabaseKey: string): SupabaseClient;
}

// Объявление типов для ImportMeta
interface ImportMeta {
  env: Record<string, string>;
}

// Объявление типов для JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  
  interface Element {
    type: any;
    props: any;
    key: any;
  }
} 