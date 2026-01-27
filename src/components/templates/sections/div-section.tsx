
interface DivSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function DivSection({ className, children, ...props }: DivSectionProps) {
    return (
        <div
            className={
                className ?? "bg-background text-foreground min-h-screen flex items-center justify-center px-4"}
            {...props}
        >
            {children}
        </div>
    );
}