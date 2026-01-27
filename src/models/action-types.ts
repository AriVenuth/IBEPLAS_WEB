export interface ActionState {
    success?: boolean;
    error?: string | null;
    message?: string | null;
    data?: any;
    redirectTo?: string;
    fields?: Record<string, string>;
}