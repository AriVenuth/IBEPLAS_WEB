import { cn } from "@/lib/utils";

interface HeaderPageSectionProps {
    title: string;
    subTitle?: string;
    className?: string;
    actions?: React.ReactNode;
}

export function HeaderPageSection({ title, subTitle, className, actions }: HeaderPageSectionProps) {
    return (
        <div className={cn("sticky top-0 z-10 flex items-center justify-between bg-background text-foreground py-4 pl-4 pr-16 border-b border-sidebar-border shadow", className)}>
            <div>
                <h1 className="text-2xl lg:text-3xl font-semibold">{title}</h1>
                {subTitle && <p className="text-sm lg:text-base text-muted-foreground">{subTitle}</p>}
            </div>
            {actions && <div>{actions}</div>}
        </div>
    )
}
