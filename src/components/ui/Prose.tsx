import { cn } from "@/lib/cn";

/**
 * Long-form typography for legal pages and article bodies. Tailwind's
 * typography plugin is deliberately not used — the site's type scale is small
 * enough to express directly, and this keeps the dependency list at zero.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[1.0625rem] leading-[1.85] text-mist",
        "[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:text-ivory sm:[&_h2]:text-[1.75rem]",
        "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:leading-snug [&_h3]:text-ivory",
        "[&_p]:mb-6",
        "[&_ul]:mb-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-0",
        "[&_li]:relative [&_li]:pl-6",
        "[&_li]:before:absolute [&_li]:before:top-[0.85em] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:-translate-y-1/2 [&_li]:before:rotate-45 [&_li]:before:bg-brass/60 [&_li]:before:content-['']",
        "[&_ol]:mb-6 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-3 [&_ol]:pl-6",
        "[&_ol_li]:pl-1 [&_ol_li]:before:hidden",
        "[&_strong]:font-medium [&_strong]:text-sand",
        "[&_a]:text-brass [&_a]:underline [&_a]:decoration-brass/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-brass",
        "[&_blockquote]:my-10 [&_blockquote]:border-l [&_blockquote]:border-brass/50 [&_blockquote]:pl-6 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:leading-relaxed [&_blockquote]:text-sand sm:[&_blockquote]:text-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
