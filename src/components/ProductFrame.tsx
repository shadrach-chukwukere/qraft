
import { QRVisual } from './QRVisual'

export function ProductFrame() {
  return (
    <div
      className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[22px] border border-line bg-white"
      aria-label="Preview of the Qraft studio"
    >
      {/* Browser toolbar */}
      <div className="flex h-[46px] items-center gap-[7px] border-b border-line bg-[#fafbfd] px-[18px]">
        <span className="h-[10px] w-[10px] rounded-full bg-[#e3e6ee]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#e3e6ee]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#e3e6ee]" />

        <span className="ml-[14px] flex h-[26px] w-full max-w-[320px] flex-1 items-center rounded-full border border-line bg-white px-4 text-[11px] text-muted">
          qraft.studio/studio
        </span>
      </div>

      {/* Studio layout */}
      <div className="grid min-h-[460px] grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] lg:grid-cols-[190px_minmax(0,1fr)_240px]">

        {/* Sidebar */}
        <aside className="hidden flex-col gap-[26px] border-r border-line bg-[#fcfcfe] p-[22px_18px] md:flex">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
            <span className="h-[20px] w-[20px] rounded-[6px] bg-navy" />
            qraft
          </div>

          <div className="flex flex-col gap-1">
            <span className="rounded-[8px] px-3 py-[9px] text-[12.5px] text-muted">
              Overview
            </span>
            <span className="rounded-[8px] bg-blue-soft px-3 py-[9px] text-[12.5px] font-medium text-navy">
              Editor
            </span>
            <span className="rounded-[8px] px-3 py-[9px] text-[12.5px] text-muted">
              Templates
            </span>
            <span className="rounded-[8px] px-3 py-[9px] text-[12.5px] text-muted">
              Projects
            </span>
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-[10px] border border-line bg-white p-3 text-[11px] text-muted">
            <span className="h-[7px] w-[7px] rounded-full bg-[#12b76a]" />
            Local-first
          </div>
        </aside>

        {/* Preview */}
        <div className="flex min-w-0 flex-col gap-[16px] bg-[radial-gradient(var(--color-line)_0.7px,transparent_0.7px)_0_0/16px_16px,#fbfcfe] p-4 sm:p-6">
          <div className="flex items-center justify-between text-[11.5px] text-muted">
            <span>Live preview</span>
            <span className="rounded-full bg-[#ecfdf3] px-2.5 py-1 text-[10.5px] font-medium text-[#027a48]">
              Updating
            </span>
          </div>

          <div className="flex min-h-[340px] flex-1 flex-col items-center justify-center gap-[14px] rounded-[16px] border border-line bg-white p-5 sm:min-h-[380px] sm:p-[28px]">
            <QRVisual size={150} />

            <span className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              SCAN TO VISIT
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-muted">
            <span>Error correction · High</span>
            <span>280 × 280</span>
          </div>
        </div>

        {/* Settings panel */}
        <aside className="hidden flex-col gap-2 border-l border-line bg-white p-[22px_20px] lg:flex">
          <div className="mt-[14px] text-[11px] font-medium uppercase tracking-[0.1em] text-subtle">
            Content
          </div>

          <div className="text-[11px] text-muted">Content type</div>
          <div className="rounded-[8px] border border-line bg-white px-3 py-[9px] text-[12px] text-ink-soft">
            URL
          </div>

          <div className="text-[11px] text-muted">Website address</div>
          <div className="break-all rounded-[8px] border border-line bg-white px-3 py-[9px] text-[12px] text-ink-soft">
            qraft.studio
          </div>

          <div className="mt-[14px] text-[11px] font-medium uppercase tracking-[0.1em] text-subtle">
            Dot style
          </div>

          <div className="flex flex-wrap gap-[6px]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-[24px] w-[24px] rounded-[7px] border border-line ${
                  i === 0 ? 'border-navy bg-navy' : 'bg-off-white'
                }`}
              />
            ))}
          </div>

          <div className="mt-[14px] text-[11px] font-medium uppercase tracking-[0.1em] text-subtle">
            Color
          </div>

          <div className="flex items-center gap-2">
            <span className="h-[20px] w-[20px] rounded-[6px] bg-navy" />
            <span className="text-[11px] text-muted">#0B1A3A</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
