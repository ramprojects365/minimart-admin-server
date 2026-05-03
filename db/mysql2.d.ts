declare module "mysql2/promise" {
  import { Pool, Connection, PoolConnection, QueryOptions } from "mysql2";

  export interface PoolCluster {
    add(id: string, config: any): void;
    getConnection(id: string, callback: (err: Error, connection: PoolConnection) => void): void;
  }

  export interface Pool {
    query(sql: string | QueryOptions, values?: any[] | ((err: Error, results?: any, fields?: any) => void)): Promise<[any, any]>;
    query(sql: string | QueryOptions, values: any[], callback: (err: Error, results?: any, fields?: any) => void): void;
    getConnection(): Promise<PoolConnection>;
    releaseConnection(connection: any): void;
    end(callback?: (err?: Error) => void): Promise<void>;
    end(): Promise<void>;
  }

  export interface PoolConnection extends Connection {
    release(): void;
  }

  export function createPool(config: any): Pool;
  export function createConnection(config: any): Promise<Connection>;
  export function createPoolCluster(config?: any): PoolCluster;
}
