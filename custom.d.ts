declare module '@/lib/db' {
    export function query({ query, values }: { query: string; values: any[] }): Promise<any>;
}
