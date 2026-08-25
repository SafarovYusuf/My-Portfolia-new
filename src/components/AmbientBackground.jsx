/**
 * Fixed, low-opacity ambient blobs that drift slowly behind the whole page.
 * Only `transform` is animated (GPU-composited), and the layer is `fixed`
 * so it never contributes to page scroll height or layout cost.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-[15%] left-[10%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[140px] animate-blob"
        style={{ animationDuration: '26s' }}
      />
      <div
        className="absolute bottom-[10%] right-[8%] h-[24rem] w-[24rem] rounded-full bg-accent-2/10 blur-[140px] animate-blob"
        style={{ animationDuration: '30s', animationDelay: '-12s' }}
      />
    </div>
  )
}
