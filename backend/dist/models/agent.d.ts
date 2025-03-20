export interface Agent {
    id: number;
    name: string;
    token: string;
    created_by: number;
    status: string;
    created_at: string;
    updated_at: string;
    hostname?: string;
    ip_address?: string;
    os?: string;
    version?: string;
    cpu_usage?: number;
    memory_total?: number;
    memory_used?: number;
    disk_total?: number;
    disk_used?: number;
    network_rx?: number;
    network_tx?: number;
}
