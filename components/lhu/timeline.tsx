/** Satu item dalam Timeline aktivitas dokumen. */
interface TimelineItem {
  label: string;
  time: string;
}

/** Props untuk komponen Timeline. */
interface TimelineProps {
  items: TimelineItem[];
}

/**
 * Menampilkan daftar peristiwa dokumen secara kronologis (Timeline vertikal).
 * Digunakan pada halaman detail LHU untuk menampilkan riwayat aktivitas.
 */
export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="relative pl-8">
          {/* Titik indikator status */}
          <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary" />
          {/* Garis vertikal penghubung antar item */}
          {index !== items.length - 1 && (
            <div className="absolute left-[5px] top-4 h-full w-px bg-border" />
          )}
          <div className="font-medium dark:text-slate-200">{item.label}</div>
          <div className="text-sm text-muted-foreground">{item.time}</div>
        </div>
      ))}
    </div>
  );
}
