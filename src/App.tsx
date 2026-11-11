import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import QRCodeStyling, { type Options } from "qr-code-styling";
import { HexColorPicker } from "react-colorful";
import { Toaster, toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import Add01Icon from "@hugeicons/core-free-icons/Add01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import CheckmarkCircle02Icon from "@hugeicons/core-free-icons/CheckmarkCircle02Icon";
import Download01Icon from "@hugeicons/core-free-icons/Download01Icon";
import FileEditIcon from "@hugeicons/core-free-icons/FileEditIcon";
import FolderLibraryIcon from "@hugeicons/core-free-icons/FolderLibraryIcon";
import Home01Icon from "@hugeicons/core-free-icons/Home01Icon";
import Image01Icon from "@hugeicons/core-free-icons/Image01Icon";
import Link01Icon from "@hugeicons/core-free-icons/Link01Icon";
import MagicWand01Icon from "@hugeicons/core-free-icons/MagicWand01Icon";
import QrCode01Icon from "@hugeicons/core-free-icons/QrCode01Icon";
import Search01Icon from "@hugeicons/core-free-icons/Search01Icon";
import Settings01Icon from "@hugeicons/core-free-icons/Settings01Icon";
import Link from "next/link";
import { Logo } from "./components/Navigation";

type Section =
  | "home"
  | "editor"
  | "templates"
  | "projects"
  | "settings"
  | "soon";
type ContentType =
  | "URL"
  | "Text"
  | "Email"
  | "Phone"
  | "SMS"
  | "Wi-Fi"
  | "vCard"
  | "WhatsApp"
  | "Location";
type DotStyle =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";
type Project = {
  id: string;
  name: string;
  updated: number;
  content: string;
  kind: ContentType;
  foreground: string;
  background: string;
  dotStyle: DotStyle;
  caption?: string;
};

const SECTIONS: Section[] = [
  "home",
  "editor",
  "templates",
  "projects",
  "settings",
  "soon",
];

/* ---------- shared class strings (light mode only) ---------- */
const btnBase =
  "inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium transition-colors duration-200";
const btnPrimary = `${btnBase} border border-transparent bg-studio-primary text-studio-on-primary hover:opacity-90`;
const btnSecondary = `${btnBase} border border-studio-line-strong bg-studio-surface text-studio-text hover:bg-studio-surface-soft`;
const inputCls =
  "w-full min-h-[48px] rounded-xl border border-studio-line-strong bg-studio-surface px-3.5 py-2.5 text-[15px] leading-[1.6] text-studio-text outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-studio-subtle focus:border-studio-accent focus:ring-[3px] focus:ring-studio-tint";
const fieldLabel = "mt-5 mb-2 block text-[14px] font-medium text-studio-text";
const eyebrow =
  "mb-2.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-studio-accent";
const pageH1 =
  "mb-3 text-[clamp(2.1rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.035em] text-studio-text";
const sectionH2 =
  "text-[26px] font-medium tracking-[-0.03em] text-studio-text";
const textLink =
  "inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-0 py-2 text-[14px] font-medium text-studio-accent hover:underline";
const soonPill =
  "whitespace-nowrap rounded-full border border-studio-line bg-studio-surface-soft px-2.5 py-1 text-[12px] font-medium leading-[1.4] text-studio-subtle";
const card = "rounded-[20px] border border-studio-line bg-studio-surface";
const grid3 = "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3";
const sectionHead = "mb-[22px] flex items-end justify-between gap-6";

const blankProject = (): Project => ({
  id: crypto.randomUUID(),
  name: "Untitled QR",
  updated: Date.now(),
  content: "https://example.com",
  kind: "URL",
  foreground: "#0b1a3a",
  background: "#ffffff",
  dotStyle: "rounded",
});
const savedProjects = (): Project[] => {
  try {
    return JSON.parse(
      localStorage.getItem("qr-studio-projects") || "[]",
    ) as Project[];
  } catch {
    return [];
  }
};
const templates = [
  {
    name: "Studio Navy",
    category: "Business",
    color: "#0b1a3a",
    bg: "#ffffff",
    style: "rounded" as DotStyle,
    note: "Clean, considered, and ready for print",
  },
  {
    name: "Sunday Table",
    category: "Restaurant",
    color: "#5a3f25",
    bg: "#f5ecdd",
    style: "classy-rounded" as DotStyle,
    note: "A warm welcome for your menu",
  },
  {
    name: "After Hours",
    category: "Events",
    color: "#3f3475",
    bg: "#f4f1ff",
    style: "dots" as DotStyle,
    note: "Made for the next thing",
  },
  {
    name: "Greenhouse",
    category: "Business",
    color: "#285941",
    bg: "#eff6f0",
    style: "extra-rounded" as DotStyle,
    note: "A little more life in the details",
  },
  {
    name: "Soft Signal",
    category: "Social",
    color: "#b34236",
    bg: "#fff8f1",
    style: "classy" as DotStyle,
    note: "A link worth passing along",
  },
  {
    name: "Clear Space",
    category: "Minimal",
    color: "#171717",
    bg: "#ffffff",
    style: "square" as DotStyle,
    note: "Nothing between them and you",
  },
];

const soonTools = [
  {
    title: "Bulk QR codes",
    note: "Create a whole set of codes from one list, without repeating the same steps.",
    icon: FolderLibraryIcon,
  },
  {
    title: "Brand kit",
    note: "Keep your colors, logo, and preferred styles together for every new design.",
    icon: Image01Icon,
  },
  {
    title: "Scan insights",
    note: "A future home for scan activity and simple reports on how your codes are doing.",
    icon: Search01Icon,
  },
];

function Icon({
  icon,
  size = 20,
  stroke = 1.8,
  className,
}: {
  icon: typeof Home01Icon;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={stroke}
      className={className}
      aria-hidden="true"
    />
  );
}

function MiniQr({
  data,
  color,
  background,
  styleType,
  size = 82,
}: {
  data: string;
  color: string;
  background: string;
  styleType: DotStyle;
  size?: number;
}) {
  const target = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!target.current) return;
    target.current.replaceChildren();
    const code = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: data || "https://qraft.studio",
      margin: 2,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { color, type: styleType },
      backgroundOptions: { color: background },
      cornersSquareOptions: { color, type: "extra-rounded" },
      cornersDotOptions: { color, type: "dot" },
    });
    code.append(target.current);
  }, [data, color, background, styleType, size]);
  return (
    <div
      className="grid place-items-center leading-none [&_canvas]:block [&_canvas]:max-h-full [&_canvas]:max-w-full [&_svg]:block [&_svg]:max-h-full [&_svg]:max-w-full"
      ref={target}
      aria-hidden="true"
    />
  );
}

function payloadFor(kind: ContentType, value: string) {
  const text = value.trim();
  if (!text) return "";
  if (kind === "Phone") return `tel:${text}`;
  if (kind === "Wi-Fi") {
    const [ssid, password, security = "WPA"] = text.split("\n");
    return `WIFI:T:${security};S:${ssid};P:${password || ""};H:false;;`;
  }
  if (kind === "vCard") {
    const [name, organization = "", phone = "", email = "", website = ""] =
      text.split("\n");
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\n${organization ? `ORG:${organization}\n` : ""}${phone ? `TEL:${phone}\n` : ""}${email ? `EMAIL:${email}\n` : ""}${website ? `URL:${website}\n` : ""}END:VCARD`;
  }
  if (kind === "Email") {
    const [address, subject = "", body = ""] = text.split("\n");
    const parts: string[] = [];
    if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
    if (body) parts.push(`body=${encodeURIComponent(body)}`);
    return `mailto:${address}${parts.length ? `?${parts.join("&")}` : ""}`;
  }
  if (kind === "SMS") {
    const [number, message = ""] = text.split("\n");
    return `SMSTO:${number}:${message}`;
  }
  if (kind === "WhatsApp") return `https://wa.me/${text.replace(/\D/g, "")}`;
  if (kind === "Location")
    return `https://maps.google.com/?q=${text.replace(/\s+/g, ",")}`;
  if (kind === "URL" && !/^https?:\/\//i.test(text)) return `https://${text}`;
  return text;
}

export function StudioApp() {
  const [section, setSection] = useState<Section>("home");
  const [project, setProject] = useState<Project>(blankProject);
  const [projects, setProjects] = useState<Project[]>(savedProjects);
  const [tab, setTab] = useState<"content" | "style" | "logo" | "frame">(
    "content",
  );
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [exportFormat, setExportFormat] = useState<
    "png" | "svg" | "jpeg" | "webp"
  >("png");
  const [logo, setLogo] = useState<string | undefined>();
  const [showPicker, setShowPicker] = useState(false);
  const [validated, setValidated] = useState<"idle" | "good" | "bad">("idle");
  const [saved, setSaved] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [colorTarget, setColorTarget] = useState<"foreground" | "background">(
    "foreground",
  );
  const qrContainer = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const payload = useMemo(
    () => payloadFor(project.kind, project.content),
    [project.kind, project.content],
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      setSection(SECTIONS.includes(hash as Section) ? (hash as Section) : "home");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);
  useEffect(() => {
    document.title = "Studio — Qraft";
    // light mode only: clear any previously stored dark preference
    document.documentElement.dataset.theme = "light";
    try {
      localStorage.removeItem("qr-studio-theme");
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    const next = section === "home" ? "" : `#${section}`;
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", `${window.location.pathname}${next}`);
    }
  }, [section]);
  useEffect(() => {
    localStorage.setItem("qr-studio-projects", JSON.stringify(projects));
  }, [projects]);
  useEffect(() => {
    const el = qrContainer.current;
    if (section !== "editor" || !el) return;
    const config: Options = {
      width: 280,
      height: 280,
      type: "svg",
      data: payload || " ",
      margin: 10,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { color: project.foreground, type: project.dotStyle },
      backgroundOptions: { color: project.background },
      cornersSquareOptions: {
        color: project.foreground,
        type: project.dotStyle === "dots" ? "dot" : "extra-rounded",
      },
      cornersDotOptions: { color: project.foreground, type: "dot" },
      image: logo,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.25,
        hideBackgroundDots: true,
      },
    };
    // The editor container is unmounted when you leave the editor, so
    // re-create the QR whenever the container is empty (fixes blank preview
    // after navigating away and back).
    if (!qrInstance.current || el.childElementCount === 0) {
      el.replaceChildren();
      qrInstance.current = new QRCodeStyling(config);
      qrInstance.current.append(el);
    } else {
      qrInstance.current.update(config);
    }
  }, [
    section,
    payload,
    project.foreground,
    project.background,
    project.dotStyle,
    logo,
  ]);

  const edit = (values: Partial<Project>) => {
    setProject((current) => ({ ...current, ...values, updated: Date.now() }));
    setSaved(false);
  };
  const create = () => {
    setProject(blankProject());
    setLogo(undefined);
    setTab("content");
    setSaved(false);
    setSection("editor");
  };
  const saveProject = useCallback(
    (quiet = false) => {
      const next = { ...project, updated: Date.now() };
      setProjects((current) => [
        next,
        ...current.filter((item) => item.id !== next.id),
      ]);
      setSaved(true);
      if (!quiet) toast.success("Saved to your projects");
    },
    [project],
  );
  const openProject = (item: Project) => {
    setProject(item);
    setLogo(undefined);
    setSaved(true);
    setSection("editor");
    setTab("content");
  };
  const applyTemplate = (template: (typeof templates)[number]) => {
    setProject({
      ...blankProject(),
      name: template.name,
      foreground: template.color,
      background: template.bg,
      dotStyle: template.style,
    });
    setLogo(undefined);
    setSaved(false);
    setSection("editor");
    toast.success(`${template.name} added to the editor`);
  };
  const download = async () => {
    if (!payload) {
      toast.error("Add some content before exporting");
      return;
    }
    try {
      await qrInstance.current?.download({
        name: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        extension: exportFormat,
      });
      toast.success(`${exportFormat.toUpperCase()} downloaded`);
    } catch {
      toast.error("This export could not be created. Try PNG or SVG.");
    }
  };
  const validate = async () => {
    if (!qrInstance.current || !payload) return;
    try {
      const blob = await qrInstance.current.getRawData("png");
      if (!blob) throw new Error("No image");
      const bitmap = await createImageBitmap(blob as Blob);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext("2d")!;
      context.drawImage(bitmap, 0, 0);
      const { default: jsQR } = await import("jsqr");
      const result = jsQR(
        context.getImageData(0, 0, canvas.width, canvas.height).data,
        canvas.width,
        canvas.height,
      );
      const valid = result?.data === payload;
      setValidated(valid ? "good" : "bad");
      toast[valid ? "success" : "error"](
        valid
          ? "QR code decoded successfully"
          : "QR code needs more contrast or less detail",
      );
    } catch {
      setValidated("bad");
      toast.error("Could not validate this QR code");
    }
  };
  // const applyAI = () => {
  //   if (!aiPrompt.trim()) {
  //     toast.error("Describe a style to get started");
  //     return;
  //   }
  //   const prompt = aiPrompt.toLowerCase();
  //   const colors = prompt.includes("blue")
  //     ? ["#2857a4", "#f3f6fb"]
  //     : prompt.includes("green")
  //       ? ["#285941", "#eff6f0"]
  //       : prompt.includes("red")
  //         ? ["#a43d34", "#fff5f2"]
  //         : prompt.includes("purple")
  //           ? ["#57419a", "#f5f2ff"]
  //           : prompt.includes("warm") || prompt.includes("restaurant")
  //             ? ["#674b2f", "#f6eddf"]
  //             : ["#0b1a3a", "#ffffff"];
  //   const style: DotStyle =
  //     prompt.includes("circle") || prompt.includes("dot")
  //       ? "dots"
  //       : prompt.includes("square")
  //         ? "square"
  //         : prompt.includes("classy")
  //           ? "classy-rounded"
  //           : "rounded";
  //   edit({ foreground: colors[0], background: colors[1], dotStyle: style });
  //   toast.success(
  //     "Demo suggestion applied. AI generation is not connected yet.",
  //   );
  // };
  const uploadLogo = (file?: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type)) {
      toast.error("Choose a PNG, JPG, WebP, or SVG image");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Keep logo images under 4 MB");
      return;
    }
    if (logo) URL.revokeObjectURL(logo);
    setLogo(URL.createObjectURL(file));
    toast.success("Logo added to the QR code");
  };

  const navItems: [Section, string, typeof Home01Icon][] = [
    ["home", "Overview", Home01Icon],
    ["editor", "QR editor", FileEditIcon],
    ["templates", "Templates", MagicWand01Icon],
    ["projects", "My projects", FolderLibraryIcon],
    ["settings", "Settings", Settings01Icon],
  ];

  const navItem = (target: Section, label: string, icon: typeof Home01Icon) => (
    <button
      key={target}
      className={`flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-xl border-0 px-3.5 text-left text-[15px] transition-[background,color] duration-200 ease-out ${
        section === target
          ? "bg-studio-tint font-semibold text-studio-text"
          : "bg-transparent font-medium text-studio-muted hover:bg-studio-surface-soft hover:text-studio-text"
      }`}
      onClick={() => setSection(target)}
      aria-label={label}
      title={label}
      aria-current={section === target ? "page" : undefined}
    >
      <Icon icon={icon} size={20} />
      <span>{label}</span>
    </button>
  );
  const pageTitle = {
    home: "Overview",
    editor: "QR editor",
    templates: "Templates",
    projects: "My projects",
    settings: "Settings",
    soon: "Coming soon",
  }[section];
  const visibleTemplates = templates.filter(
    (item) =>
      (filter === "All" || item.category === filter) &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const shapeStyle = (shape: DotStyle): CSSProperties => {
    const base: CSSProperties = { background: project.foreground };
    switch (shape) {
      case "square":
        return base;
      case "rounded":
        return { ...base, borderRadius: 6 };
      case "extra-rounded":
        return { ...base, borderRadius: 12 };
      case "dots":
        return {
          border: 0,
          background: `radial-gradient(circle, ${project.foreground} 0 3px, transparent 3.6px) 0 0 / 8px 8px`,
        };
      case "classy":
        return { ...base, borderRadius: "4px 12px 4px 12px" };
      default:
        return { ...base, borderRadius: "10px 4px 10px 4px" };
    }
  };

  const quickCard =
    "flex cursor-pointer items-center gap-4 rounded-[18px] border border-studio-line bg-studio-surface p-6 text-left text-studio-text transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-studio-line-strong hover:shadow-studio-card";
  const quickIcon =
    "grid h-[50px] w-[50px] flex-none place-items-center rounded-[14px] bg-studio-tint text-studio-accent";

  return (
    <div className="min-h-screen bg-studio-bg font-sans text-[16px] leading-[1.6] text-studio-text [color-scheme:light]">
      <Toaster position="bottom-right" theme="light" richColors />

      {/* Fixed sidebar — desktop only */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[288px] flex-col gap-[30px] overflow-y-auto border-r border-studio-line bg-studio-surface px-5 pt-7 pb-[22px] lg:flex">
        <button
          className="flex cursor-pointer items-center gap-3 border-0 bg-transparent px-1.5 text-left text-studio-text"
          onClick={() => setSection("home")}
          aria-label="Qraft studio home"
        >
        <Logo/>
          <span className="text-[23px] font-semibold tracking-[-0.03em] text-studio-text">
            Q<span className="font-normal text-studio-muted">raft</span>
          </span>
        </button>

        <div className="grid gap-2.5">
          <p className="m-0 px-3.5 text-[12px] font-semibold uppercase tracking-[0.13em] text-studio-subtle">
            Workspace
          </p>
          <nav className="grid gap-1" aria-label="Studio navigation">
            {navItems.map(([target, label, icon]) =>
              navItem(target, label, icon),
            )}
          </nav>
        </div>

        <div className="grid gap-2.5">
          <p className="m-0 px-3.5 text-[12px] font-semibold uppercase tracking-[0.13em] text-studio-subtle">
            Coming soon
          </p>
          <div className="grid gap-1">
            {soonTools.map((tool) => (
              <button
                key={tool.title}
                className="flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-xl border-0 bg-transparent px-3.5 text-left text-[15px] font-medium text-studio-subtle transition-[background,color] duration-200 ease-out hover:bg-studio-surface-soft hover:text-studio-text"
                onClick={() => setSection("soon")}
                aria-label={`${tool.title} — coming soon`}
                title={`${tool.title} — coming soon`}
              >
                <Icon icon={tool.icon} size={20} />
                <span>{tool.title}</span>
                <span className={`ml-auto ${soonPill}`}>Soon</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto grid gap-4">
          <Link
            href="/"
            className="flex min-h-[46px] items-center gap-2.5 rounded-xl border border-studio-line px-3.5 text-[14px] font-medium text-studio-muted transition-[border-color,color] duration-200 ease-out hover:border-studio-line-strong hover:text-studio-text"
            aria-label="Back to website"
          >
            <span aria-hidden="true">←</span>
            <span>Back to website</span>
          </Link>
          <div className="flex items-center gap-3 border-t border-studio-line px-1.5 pt-[18px]">
            <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-studio-tint text-[15px] font-semibold text-studio-accent">
              F
            </span>
            <span className="grid min-w-0 gap-0.5">
              <b className="text-[14px] font-semibold">Your workspace</b>
              <small className="text-[13px] text-studio-subtle">
                Saved on this device
              </small>
            </span>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="relative min-h-screen min-w-0 bg-studio-bg lg:ml-[288px]">
        {/* Sticky topbar */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between gap-6 border-b border-studio-line bg-studio-surface/90 px-4 backdrop-blur-md sm:px-6 lg:h-[84px] lg:px-10">
          <div className="flex items-center gap-2.5 text-[14px] text-studio-subtle">
            <span>Studio</span>
            <span aria-hidden="true">/</span>
            <strong className="font-semibold text-studio-text">
              {pageTitle}
            </strong>
          </div>
          <button className={btnPrimary} onClick={create}>
            <Icon icon={Add01Icon} size={19} />
            Create QR
          </button>
        </header>

        {/* Mobile / tablet navigation (sidebar is hidden below lg) */}
        <nav
          className="flex gap-2 overflow-x-auto border-b border-studio-line bg-studio-surface px-4 py-3 sm:px-6 lg:hidden"
          aria-label="Studio navigation"
        >
          {navItems.map(([target, label]) => (
            <button
              key={target}
              onClick={() => setSection(target)}
              aria-current={section === target ? "page" : undefined}
              className={`min-h-[40px] flex-none cursor-pointer whitespace-nowrap rounded-full border px-4 text-[14px] font-medium transition-colors duration-200 ${
                section === target
                  ? "border-studio-primary bg-studio-primary text-studio-on-primary"
                  : "border-studio-line bg-studio-surface text-studio-muted hover:text-studio-text"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Page content */}
        <div className="px-4 pt-8 pb-14 sm:px-6 lg:px-10 lg:pt-10">
          {section === "home" && (
            <div className="mx-auto w-[min(1360px,100%)]">
              <section className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[28px] border border-studio-line bg-studio-surface bg-[radial-gradient(ellipse_75%_85%_at_0%_0%,#edf2ff_0%,rgba(255,255,255,0)_62%)] p-6 sm:p-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 lg:p-14">
                <div className="relative z-[1]">
                  <p className={eyebrow}>Your creative workspace</p>
                  <h1 className="mb-5 text-[clamp(2.6rem,4.4vw,3.7rem)] font-medium leading-[1.04] tracking-[-0.04em] text-studio-text">
                    Make a code worth
                    <br /> scanning.
                  </h1>
                  <p className="m-0 max-w-[540px] text-[17px] leading-[1.75] text-studio-muted">
                    Good design gets noticed. Build a QR code, shape it to your
                    taste, and check that it scans — all in one calm place.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className={btnPrimary} onClick={create}>
                      <Icon icon={Add01Icon} size={19} />
                      Create a QR code
                    </button>
                    <button
                      className={btnSecondary}
                      onClick={() => setSection("templates")}
                    >
                      Explore templates
                      <Icon icon={ArrowRight01Icon} size={18} />
                    </button>
                  </div>
                </div>
                <div className="relative grid min-h-[330px] place-items-center">
                  <span className="absolute top-2.5 right-0 z-[2] whitespace-nowrap rounded-full border border-studio-line bg-studio-surface px-4 py-1.5 text-[13px] font-medium text-studio-muted shadow-studio-card">
                    Local-first
                  </span>
                  <div className="relative z-[1] grid w-[270px] rotate-[2deg] justify-items-center gap-[18px] rounded-3xl border border-[#e3e7ef] bg-white p-[30px] shadow-[0_24px_60px_rgb(11_26_58/0.12)]">
                    <MiniQr
                      data="https://qraft.studio"
                      color="#0b1a3a"
                      background="#ffffff"
                      styleType="rounded"
                      size={190}
                    />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#5b6472]">
                      Scan to discover
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-0 z-[2] whitespace-nowrap rounded-full border border-studio-line bg-studio-surface px-4 py-1.5 text-[13px] font-medium text-studio-muted shadow-studio-card">
                    High error correction
                  </span>
                </div>
              </section>

              <section
                className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3"
                aria-label="Quick actions"
              >
                <button className={quickCard} onClick={create}>
                  <span className={quickIcon}>
                    <Icon icon={QrCode01Icon} size={22} />
                  </span>
                  <span className="grid min-w-0 flex-1 gap-[3px]">
                    <b className="text-[16px] font-semibold">
                      Start from scratch
                    </b>
                    <small className="text-[14px] text-studio-muted">
                      Build a QR code your way
                    </small>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
                <button
                  className={quickCard}
                  onClick={() => setSection("templates")}
                >
                  <span className={quickIcon}>
                    <Icon icon={MagicWand01Icon} size={22} />
                  </span>
                  <span className="grid min-w-0 flex-1 gap-[3px]">
                    <b className="text-[16px] font-semibold">Pick a template</b>
                    <small className="text-[14px] text-studio-muted">
                      Start with a polished style
                    </small>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
                <button
                  className={quickCard}
                  onClick={() => setSection("projects")}
                >
                  <span className={quickIcon}>
                    <Icon icon={FolderLibraryIcon} size={22} />
                  </span>
                  <span className="grid min-w-0 flex-1 gap-[3px]">
                    <b className="text-[16px] font-semibold">Open a project</b>
                    <small className="text-[14px] text-studio-muted">
                      Continue where you left off
                    </small>
                  </span>
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
              </section>

              <section className="mt-[52px]">
                <div className={sectionHead}>
                  <div>
                    <h2 className={sectionH2}>More tools are on the way.</h2>
                    <p className="m-0 text-[15px] text-studio-muted">
                      A little room to grow. These tools are not available yet.
                    </p>
                  </div>
                  <button
                    className={textLink}
                    onClick={() => setSection("soon")}
                  >
                    See what&apos;s coming
                    <Icon icon={ArrowRight01Icon} size={16} />
                  </button>
                </div>
                <div className={grid3}>
                  {soonTools.map((tool) => (
                    <button
                      key={tool.title}
                      className="grid cursor-pointer content-start gap-3 rounded-[18px] border border-dashed border-studio-line-strong bg-studio-surface/70 p-7 text-left text-studio-text transition-[border-color,background] duration-200 ease-out hover:border-studio-accent hover:bg-studio-surface"
                      onClick={() => setSection("soon")}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-studio-tint text-studio-accent">
                          <Icon icon={tool.icon} size={20} />
                        </span>
                        <span className={soonPill}>Coming soon</span>
                      </span>
                      <h3 className="mt-1 mb-0 text-[20px] font-medium tracking-[-0.02em] text-studio-text">
                        {tool.title}
                      </h3>
                      <p className="m-0 text-[14px] leading-[1.65] text-studio-muted">
                        {tool.note}
                      </p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-[52px]">
                <div className={sectionHead}>
                  <div>
                    <h2 className={sectionH2}>Recent projects</h2>
                    <p className="m-0 text-[15px] text-studio-muted">
                      Pick up right where you left off.
                    </p>
                  </div>
                  <button
                    className={textLink}
                    onClick={() => setSection("projects")}
                  >
                    See all
                    <Icon icon={ArrowRight01Icon} size={16} />
                  </button>
                </div>
                {projects.length ? (
                  <div className={grid3}>
                    {projects.slice(0, 3).map((item) => (
                      <ProjectCard
                        key={item.id}
                        item={item}
                        onOpen={() => openProject(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[156px] flex-col items-start gap-5 rounded-[18px] border border-dashed border-studio-line-strong bg-studio-surface p-[26px] sm:flex-row sm:items-center">
                    <div className="grid h-[58px] w-[58px] flex-none place-items-center rounded-2xl bg-studio-tint text-studio-accent">
                      <Icon icon={QrCode01Icon} size={28} />
                    </div>
                    <div className="grid flex-1 gap-1">
                      <strong className="text-[16px] font-semibold text-studio-text">
                        Your next great QR code starts here.
                      </strong>
                      <span className="text-[14px] text-studio-muted">
                        Save your first design and it will show up here.
                      </span>
                    </div>
                    <button className={btnSecondary} onClick={create}>
                      Create your first code
                      <Icon icon={ArrowRight01Icon} size={17} />
                    </button>
                  </div>
                )}
              </section>

              <section className="mt-[52px]">
                <div className={sectionHead}>
                  <div>
                    <h2 className={sectionH2}>A good place to start</h2>
                    <p className="m-0 text-[15px] text-studio-muted">
                      Thoughtful styles, ready for your content.
                    </p>
                  </div>
                  <button
                    className={textLink}
                    onClick={() => setSection("templates")}
                  >
                    Browse templates
                    <Icon icon={ArrowRight01Icon} size={16} />
                  </button>
                </div>
                <div className={grid3}>
                  {templates.slice(0, 3).map((template) => (
                    <TemplateCard
                      key={template.name}
                      template={template}
                      onClick={() => applyTemplate(template)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          
{section === "editor" && (
  <div className="mx-auto w-full max-w-[1600px] min-w-0">
    {/* Editor header */}
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="grid h-11 w-11 flex-none rotate-180 cursor-pointer place-items-center rounded-full border border-studio-line bg-studio-surface text-studio-muted transition-colors hover:border-studio-line-strong hover:text-studio-text"
          aria-label="Back to overview"
          onClick={() => setSection("home")}
        >
          <Icon icon={ArrowRight01Icon} size={20} />
        </button>

        <div className="grid min-w-0 gap-1">
          <input
            aria-label="Project name"
            value={project.name}
            onChange={(event) => edit({ name: event.target.value })}
            className="w-[min(340px,60vw)] rounded-lg border border-transparent bg-transparent px-2 py-1 text-lg font-medium tracking-tight text-studio-text outline-none hover:border-studio-line hover:bg-studio-surface focus:border-studio-accent focus:bg-studio-surface"
          />

          <span
            className={`flex items-center gap-1.5 pl-2 text-xs ${
              saved ? "text-studio-success" : "text-studio-subtle"
            }`}
          >
            <Icon
              icon={saved ? CheckmarkCircle02Icon : FileEditIcon}
              size={14}
            />
            {saved ? "Saved on this device" : "Draft — not saved yet"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className={`${btnSecondary} !min-h-[44px] !px-4 !text-sm`}
          onClick={() => saveProject()}
        >
          <Icon icon={FolderLibraryIcon} size={18} />
          Save project
        </button>

        <button
          className={`${btnPrimary} !min-h-[44px] !px-4 !text-sm`}
          onClick={download}
        >
          <Icon icon={Download01Icon} size={18} />
          Export
        </button>
      </div>
    </div>

    {/* Editor workspace */}
    <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">

      {/* Preview: first on mobile, right on desktop */}
      <section
        className={`${card} order-1 flex min-h-[540px] min-w-0 flex-col overflow-hidden p-4 sm:p-6 xl:order-2 xl:min-h-[780px]`}
        aria-label="Live QR preview"
      >
        {/* Preview heading */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-studio-subtle">
              Live preview
            </span>

            <h2 className="mt-1.5 mb-0 text-xl font-medium tracking-tight text-studio-text sm:text-2xl">
              Your design, as it happens.
            </h2>

            <p className="mt-1.5 mb-0 text-sm text-studio-muted">
              Changes appear here automatically.
            </p>
          </div>

          {/* Zoom controls */}
          <div className="flex flex-none items-center gap-2 rounded-xl border border-studio-line bg-studio-surface p-1">
            <button
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-lg text-studio-text transition-colors hover:bg-studio-surface-soft disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom out"
              disabled={zoom <= 60}
              onClick={() =>
                setZoom((value) => Math.max(60, value - 10))
              }
            >
              −
            </button>

            <span className="w-11 text-center text-xs font-medium tabular-nums text-studio-muted">
              {zoom}%
            </span>

            <button
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-lg text-studio-text transition-colors hover:bg-studio-surface-soft disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom in"
              disabled={zoom >= 120}
              onClick={() =>
                setZoom((value) => Math.min(120, value + 10))
              }
            >
              +
            </button>
          </div>
        </div>

        {/* QR canvas */}
        <div className="relative my-6 flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-studio-line bg-studio-surface-soft bg-[radial-gradient(var(--studio-line-strong)_0.7px,transparent_0.7px)] bg-[length:20px_20px] px-3 py-12 sm:min-h-[540px] sm:px-8 xl:min-h-[590px]">
          {/* White QR sheet */}
          <div
            className="flex w-full max-w-[480px] flex-col items-center justify-center gap-5 rounded-2xl border border-[#e3e7ef] bg-white p-5 sm:p-9"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center",
            }}
          >
            {/* Actual QR code */}
            <div
              className="grid aspect-square w-full max-w-[360px] place-items-center overflow-hidden"
              ref={qrContainer}
              aria-label="Generated QR code preview"
            />

            {project.caption && (
              <div className="max-w-full break-words text-center text-sm font-semibold uppercase tracking-widest text-[#343a45]">
                {project.caption}
              </div>
            )}
          </div>

          {/* Canvas status */}
          <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-between gap-3 text-xs text-studio-muted sm:right-6 sm:left-6">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-studio-success" />
              Updating live
            </span>

            <span>High error correction</span>
          </div>
        </div>

        {/* Preview footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-studio-line pt-4">
          <div className="flex min-w-0 items-center gap-2 text-xs leading-relaxed text-studio-muted sm:text-sm">
            <Icon
              icon={CheckmarkCircle02Icon}
              size={18}
              className="flex-none text-studio-success"
            />
            <span>
              Generated locally. Your content stays on this device.
            </span>
          </div>

          <button
            className="inline-flex flex-none cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-sm font-medium text-studio-accent"
            onClick={validate}
          >
            Test scan
            <Icon icon={ArrowRight01Icon} size={17} />
          </button>
        </div>
      </section>

      {/* Design controls */}
      <section
        className={`${card} order-2 min-w-0 overflow-hidden xl:order-1`}
        aria-label="QR design controls"
      >
        {/* Tabs */}
        <div
          className="grid grid-cols-4 gap-1 border-b border-studio-line bg-studio-surface-soft p-2"
          role="tablist"
          aria-label="Design sections"
        >
          {(
            [
              ["content", "Content"],
              ["style", "Style"],
              ["logo", "Logo"],
              ["frame", "Frame"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              id={`editor-tab-${key}`}
              role="tab"
              aria-selected={tab === key}
              aria-controls="editor-tabpanel"
              className={`min-h-11 cursor-pointer rounded-full border-0 px-1 text-xs font-medium transition-colors sm:text-sm ${
                tab === key
                  ? "bg-studio-primary text-studio-on-primary"
                  : "bg-transparent text-studio-muted hover:text-studio-text"
              }`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          className="p-4 sm:p-6"
          id="editor-tabpanel"
          role="tabpanel"
          aria-labelledby={`editor-tab-${tab}`}
        >
          {/* CONTENT */}
          {tab === "content" && (
            <div>
              <h3 className="m-0 text-xl font-medium tracking-tight text-studio-text">
                What should it open?
              </h3>

              <p className="mt-1.5 mb-0 text-sm leading-relaxed text-studio-muted">
                Your content stays on your device.
              </p>

              <label className={fieldLabel} htmlFor="qr-kind">
                Content type
              </label>

              <select
                id="qr-kind"
                className={inputCls}
                value={project.kind}
                onChange={(event) =>
                  edit({
                    kind: event.target.value as ContentType,
                    content:
                      event.target.value === "URL"
                        ? "https://example.com"
                        : "",
                  })
                }
              >
                {(
                  [
                    "URL",
                    "Text",
                    "Email",
                    "Phone",
                    "SMS",
                    "Wi-Fi",
                    "vCard",
                    "WhatsApp",
                    "Location",
                  ] as ContentType[]
                ).map((kind) => (
                  <option key={kind}>{kind}</option>
                ))}
              </select>

              <label className={fieldLabel} htmlFor="qr-content">
                {project.kind === "URL"
                  ? "Website address"
                  : project.kind === "Text"
                    ? "Your message"
                    : project.kind === "Wi-Fi"
                      ? "Network details"
                      : project.kind === "vCard"
                        ? "Contact details"
                        : project.kind === "Location"
                          ? "Coordinates or place"
                          : project.kind === "WhatsApp"
                            ? "Phone number with country code"
                            : project.kind === "Email"
                              ? "Email details"
                              : project.kind === "SMS"
                                ? "SMS details"
                                : "Phone number"}
              </label>

              <textarea
                id="qr-content"
                className={`${inputCls} resize-y`}
                rows={project.kind === "Text" ? 5 : 4}
                value={project.content}
                onChange={(event) =>
                  edit({ content: event.target.value })
                }
                placeholder={
                  project.kind === "URL"
                    ? "yourwebsite.com"
                    : project.kind === "Wi-Fi"
                      ? "Network name\nPassword\nWPA"
                      : project.kind === "vCard"
                        ? "Full name\nOrganization\nPhone\nEmail\nWebsite"
                        : project.kind === "Email"
                          ? "Email address\nSubject\nMessage"
                          : project.kind === "SMS"
                            ? "Phone number\nMessage"
                            : project.kind === "Location"
                              ? "Latitude, longitude"
                              : project.kind === "WhatsApp"
                                ? "Country code and phone number"
                                : "Enter your content"
                }
              />

              {(
                ["Wi-Fi", "vCard", "Email", "SMS"] as ContentType[]
              ).includes(project.kind) && (
                <p className="mt-2 mb-0 text-xs leading-relaxed text-studio-muted">
                  Enter one detail per line, in the order shown in the example.
                </p>
              )}

              <div className="mt-3 flex min-w-0 items-start gap-2.5 break-words rounded-xl bg-studio-surface-soft px-3.5 py-3 text-xs leading-relaxed text-studio-muted [overflow-wrap:anywhere]">
                <Icon
                  icon={Link01Icon}
                  size={17}
                  className="mt-0.5 flex-none text-studio-accent"
                />
                <span className="min-w-0">
                  {payload || "Add content to see your QR code update"}
                </span>
              </div>

              <div className="my-6 h-px bg-studio-line" />

              <h3 className="m-0 text-lg font-medium text-studio-text">
                Try a starting point
              </h3>

              <p className="mt-1.5 mb-0 text-sm text-studio-muted">
                Get your design moving.
              </p>

              <div className="mt-3 grid gap-1.5">
                {templates.slice(0, 3).map((template) => (
                  <button
                    key={template.name}
                    className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-transparent bg-transparent px-3 text-left text-sm text-studio-text transition-colors hover:border-studio-line hover:bg-studio-surface-soft"
                    onClick={() =>
                      edit({
                        foreground: template.color,
                        background: template.bg,
                        dotStyle: template.style,
                      })
                    }
                  >
                    <span
                      className="h-5 w-5 flex-none rounded-md"
                      style={{ background: template.color }}
                    />
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STYLE */}
          {tab === "style" && (
            <div>
              <h3 className="m-0 text-xl font-medium tracking-tight text-studio-text">
                Make it yours
              </h3>

              <p className="mt-1.5 mb-0 text-sm leading-relaxed text-studio-muted">
                Keep enough contrast for reliable scanning.
              </p>

              <span className={fieldLabel}>Dot shape</span>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ["square", "Square"],
                    ["rounded", "Rounded"],
                    ["extra-rounded", "Soft"],
                    ["dots", "Dots"],
                    ["classy", "Classy"],
                    ["classy-rounded", "Classic"],
                  ] as [DotStyle, string][]
                ).map(([shape, label]) => (
                  <button
                    key={shape}
                    className={`grid min-h-[82px] cursor-pointer content-center justify-items-center gap-2 rounded-xl border px-1 py-2 transition-colors ${
                      project.dotStyle === shape
                        ? "border-studio-accent bg-studio-tint text-studio-text"
                        : "border-studio-line bg-studio-surface text-studio-muted hover:border-studio-line-strong"
                    }`}
                    aria-pressed={project.dotStyle === shape}
                    onClick={() => edit({ dotStyle: shape })}
                  >
                    <span className="h-7 w-7" style={shapeStyle(shape)} />
                    <span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>

              <div className="my-6 h-px bg-studio-line" />

              <div className="flex items-center justify-between gap-3">
                <label
                  className="text-sm font-medium text-studio-text"
                  htmlFor="foreground"
                >
                  Code color
                </label>

                <button
                  className="h-9 w-9 cursor-pointer rounded-lg border-2 border-studio-surface outline outline-1 outline-studio-line-strong"
                  aria-label="Choose code color"
                  style={{ background: project.foreground }}
                  onClick={() => {
                    setColorTarget("foreground");
                    setShowPicker(
                      (show) =>
                        colorTarget !== "foreground" || !show,
                    );
                  }}
                />
              </div>

              <input
                id="foreground"
                className={`${inputCls} mt-2`}
                value={project.foreground}
                onChange={(event) =>
                  edit({ foreground: event.target.value })
                }
              />

              <div className="mt-5 flex items-center justify-between gap-3">
                <label
                  className="text-sm font-medium text-studio-text"
                  htmlFor="background"
                >
                  Background
                </label>

                <button
                  className="h-9 w-9 cursor-pointer rounded-lg border-2 border-studio-surface outline outline-1 outline-studio-line-strong"
                  aria-label="Choose background color"
                  style={{ background: project.background }}
                  onClick={() => {
                    setColorTarget("background");
                    setShowPicker(
                      (show) =>
                        colorTarget !== "background" || !show,
                    );
                  }}
                />
              </div>

              <input
                id="background"
                className={`${inputCls} mt-2`}
                value={project.background}
                onChange={(event) =>
                  edit({ background: event.target.value })
                }
              />

              {showPicker && (
                <div className="mt-4">
                  <p className="mb-2 text-xs text-studio-muted">
                    Editing{" "}
                    {colorTarget === "foreground"
                      ? "code color"
                      : "background"}
                  </p>

                  <HexColorPicker
                    color={project[colorTarget]}
                    onChange={(color) =>
                      edit({ [colorTarget]: color })
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              )}

              <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-studio-tint px-3.5 py-3 text-xs leading-relaxed text-studio-accent">
                <Icon
                  icon={CheckmarkCircle02Icon}
                  size={18}
                  className="mt-px flex-none"
                />
                High contrast helps more cameras scan your code.
              </div>

              <label className={fieldLabel} htmlFor="export-format">
                Download format
              </label>

              <select
                id="export-format"
                className={inputCls}
                value={exportFormat}
                onChange={(event) =>
                  setExportFormat(
                    event.target.value as typeof exportFormat,
                  )
                }
              >
                <option value="png">PNG image</option>
                <option value="svg">SVG vector</option>
                <option value="jpeg">JPEG image</option>
                <option value="webp">WebP image</option>
              </select>
            </div>
          )}

          {/* LOGO */}
          {tab === "logo" && (
            <div>
              <h3 className="m-0 text-xl font-medium tracking-tight text-studio-text">
                Add your mark
              </h3>

              <p className="mt-1.5 mb-5 text-sm leading-relaxed text-studio-muted">
                A small logo makes it unmistakably yours.
              </p>

              <button
                className="grid min-h-[170px] w-full cursor-pointer content-center justify-items-center gap-2.5 rounded-2xl border border-dashed border-studio-line-strong bg-studio-surface-soft p-5 text-studio-text transition-colors hover:border-studio-accent hover:bg-studio-surface"
                onClick={() => uploadRef.current?.click()}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-studio-surface text-studio-accent">
                  <Icon icon={Image01Icon} size={24} />
                </span>

                <b className="text-sm font-semibold">
                  {logo ? "Replace image" : "Upload a logo"}
                </b>

                <small className="text-xs text-studio-muted">
                  PNG, JPG, WebP, or SVG · up to 4 MB
                </small>
              </button>

              <input
                ref={uploadRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                hidden
                onChange={(event) =>
                  uploadLogo(event.target.files?.[0])
                }
              />

              {logo && (
                <button
                  className="mt-3 cursor-pointer border-0 bg-transparent p-0 text-sm text-studio-danger"
                  onClick={() => {
                    URL.revokeObjectURL(logo);
                    setLogo(undefined);
                    if (uploadRef.current) {
                      uploadRef.current.value = "";
                    }
                  }}
                >
                  Remove logo
                </button>
              )}

              <div className="my-5 rounded-xl bg-studio-surface-soft px-4 py-4">
                <strong className="text-sm font-semibold text-studio-text">
                  Keep it readable
                </strong>

                <p className="mt-1.5 mb-0 text-xs leading-relaxed text-studio-muted">
                  Use a simple mark with a transparent background. Logo
                  placement can affect scanning, so validate before you print.
                </p>
              </div>

              <button
                className={`flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 text-sm font-medium transition-colors ${
                  validated === "good"
                    ? "bg-studio-success-soft text-studio-success"
                    : validated === "bad"
                      ? "bg-red-50 text-studio-danger"
                      : "bg-studio-tint text-studio-accent"
                }`}
                onClick={validate}
              >
                <Icon icon={CheckmarkCircle02Icon} size={18} />
                {validated === "good"
                  ? "Scans correctly"
                  : validated === "bad"
                    ? "Try adjusting your design"
                    : "Check if this code scans"}
              </button>
            </div>
          )}

          {/* FRAME */}
          {tab === "frame" && (
            <div>
              <h3 className="m-0 text-xl font-medium tracking-tight text-studio-text">
                Give it a frame
              </h3>

              <p className="mt-1.5 mb-0 text-sm leading-relaxed text-studio-muted">
                A clear prompt invites people to scan.
              </p>

              <label className={fieldLabel} htmlFor="frame-caption">
                Caption
              </label>

              <input
                id="frame-caption"
                className={inputCls}
                placeholder="Scan to visit"
                value={project.caption || ""}
                onChange={(event) =>
                  edit({ caption: event.target.value })
                }
              />

              <div className="mt-5 grid justify-items-center gap-3 rounded-xl border border-studio-line bg-studio-surface-soft px-4 py-7">
                <div className="grid h-[106px] w-[106px] place-items-center rounded-lg border border-studio-line bg-studio-surface text-studio-text">
                  <Icon icon={QrCode01Icon} size={58} />
                </div>

                <span className="max-w-full break-words text-center text-xs font-semibold uppercase tracking-widest text-studio-muted">
                  {project.caption || "SCAN TO VISIT"}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-studio-surface-soft px-4 py-4">
                <strong className="text-sm font-semibold text-studio-text">
                  Frames are in the works
                </strong>

                <p className="mt-1.5 mb-0 text-xs leading-relaxed text-studio-muted">
                  Your caption is saved with this design. Export framing
                  and layout controls will be added in a future editor update.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  </div>
)}

          {section === "templates" && (
            <div className="mx-auto w-[min(1360px,100%)]">
              <div className="mb-8">
                <p className={eyebrow}>A head start</p>
                <h1 className={pageH1}>Templates</h1>
                <p className="m-0 max-w-[620px] text-[16px] text-studio-muted">
                  Pick a direction. Make it yours.
                </p>
              </div>
              <div className="mb-[26px] flex flex-wrap items-center justify-between gap-5">
                <div className="flex h-[50px] w-full items-center gap-2.5 rounded-full border border-studio-line bg-studio-surface px-[18px] text-studio-subtle sm:w-[320px]">
                  <Icon icon={Search01Icon} size={19} />
                  <input
                    aria-label="Search templates"
                    placeholder="Search styles"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full border-0 bg-transparent text-[15px] text-studio-text outline-none placeholder:text-studio-subtle"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Business",
                    "Restaurant",
                    "Events",
                    "Social",
                    "Minimal",
                  ].map((value) => (
                    <button
                      key={value}
                      className={`min-h-[42px] cursor-pointer rounded-full border px-[17px] text-[14px] transition-[border-color,background,color] duration-200 ease-out ${
                        filter === value
                          ? "border-studio-primary bg-studio-primary text-studio-on-primary"
                          : "border-studio-line bg-studio-surface text-studio-muted hover:border-studio-line-strong hover:text-studio-text"
                      }`}
                      onClick={() => setFilter(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              {visibleTemplates.length ? (
                <div className={grid3}>
                  {visibleTemplates.map((template) => (
                    <TemplateCard
                      key={template.name}
                      template={template}
                      onClick={() => applyTemplate(template)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[380px] content-center justify-items-center gap-3.5 rounded-[22px] border border-dashed border-studio-line-strong bg-studio-surface p-10 text-center">
                  <span className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-studio-tint text-studio-accent">
                    <Icon icon={Search01Icon} size={30} />
                  </span>
                  <h2 className="m-0 text-[24px] font-medium tracking-[-0.03em] text-studio-text">
                    No templates match.
                  </h2>
                  <p className="m-0 text-[15px] text-studio-muted">
                    Try a different word or category.
                  </p>
                  <button
                    className={btnSecondary}
                    onClick={() => {
                      setSearch("");
                      setFilter("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}

          {section === "projects" && (
            <div className="mx-auto w-[min(1360px,100%)]">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className={eyebrow}>Your workspace</p>
                  <h1 className={pageH1}>My projects</h1>
                  <p className="m-0 max-w-[620px] text-[16px] text-studio-muted">
                    All the QR codes you&apos;ve saved, in one place.
                  </p>
                </div>
                <button className={btnPrimary} onClick={create}>
                  <Icon icon={Add01Icon} size={18} />
                  New project
                </button>
              </div>
              {projects.length ? (
                <div className={grid3}>
                  {projects.map((item) => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      onOpen={() => openProject(item)}
                      onDelete={() => {
                        setProjects((list) =>
                          list.filter(
                            (projectItem) => projectItem.id !== item.id,
                          ),
                        );
                        toast.success("Project removed");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid min-h-[380px] content-center justify-items-center gap-3.5 rounded-[22px] border border-dashed border-studio-line-strong bg-studio-surface p-10 text-center">
                  <span className="grid h-[58px] w-[58px] place-items-center rounded-2xl bg-studio-tint text-studio-accent">
                    <Icon icon={QrCode01Icon} size={32} />
                  </span>
                  <h2 className="m-0 text-[24px] font-medium tracking-[-0.03em] text-studio-text">
                    Nothing saved just yet.
                  </h2>
                  <p className="m-0 text-[15px] text-studio-muted">
                    Your designs are stored locally and ready whenever you are.
                  </p>
                  <button className={btnPrimary} onClick={create}>
                    Create your first code
                  </button>
                </div>
              )}
            </div>
          )}

          {section === "settings" && (
            <div className="mx-auto w-[min(1360px,100%)]">
              <div className="mb-8">
                <p className={eyebrow}>Make it yours</p>
                <h1 className={pageH1}>Settings</h1>
                <p className="m-0 max-w-[620px] text-[16px] text-studio-muted">
                  Your preferences stay on this device.
                </p>
              </div>
              <div className="grid max-w-[940px] gap-4">
                {[
                  {
                    title: "AI design provider",
                    text: "AI suggestions are currently running in local demo mode.",
                    right: (
                      <span className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-studio-line px-3.5 py-2 text-[13px] text-studio-muted">
                        Not connected
                      </span>
                    ),
                  },
                  {
                    title: "Private by default",
                    text: "QR codes and uploaded logos stay in your browser.",
                    right: (
                      <span className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-full border border-studio-success/30 bg-studio-success-soft px-3.5 py-2 text-[13px] text-studio-success">
                        <Icon icon={CheckmarkCircle02Icon} size={16} />
                        On
                      </span>
                    ),
                  },
                  {
                    title: "Saved projects",
                    text: `${projects.length} ${projects.length === 1 ? "project" : "projects"} stored in this browser.`,
                    right: (
                      <button
                        className={textLink}
                        onClick={() => setSection("projects")}
                      >
                        View projects
                        <Icon icon={ArrowRight01Icon} size={16} />
                      </button>
                    ),
                  },
                  {
                    title: "More tools",
                    text: "Bulk QR codes, a brand kit, and scan insights are on the way.",
                    right: (
                      <button
                        className={textLink}
                        onClick={() => setSection("soon")}
                      >
                        See what&apos;s coming
                        <Icon icon={ArrowRight01Icon} size={16} />
                      </button>
                    ),
                  },
                ].map((row) => (
                  <section
                    key={row.title}
                    className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 rounded-[18px] border border-studio-line bg-studio-surface px-7 py-[26px]"
                  >
                    <div>
                      <h3 className="m-0 mb-1.5 text-[18px] font-medium tracking-[-0.02em] text-studio-text">
                        {row.title}
                      </h3>
                      <p className="m-0 text-[14px] text-studio-muted">
                        {row.text}
                      </p>
                    </div>
                    {row.right}
                  </section>
                ))}
              </div>
            </div>
          )}

          {section === "soon" && (
            <div className="mx-auto w-[min(1360px,100%)]">
              <div className="mb-8">
                <p className={eyebrow}>On the roadmap</p>
                <h1 className={pageH1}>More tools are on the way.</h1>
                <p className="m-0 max-w-[620px] text-[16px] text-studio-muted">
                  The studio is growing. These tools are being prepared and are
                  not available to use yet.
                </p>
              </div>
              <div className={grid3}>
                {soonTools.map((tool, index) => (
                  <article
                    className="grid content-start gap-3 rounded-[18px] border border-studio-line bg-studio-surface p-[34px]"
                    key={tool.title}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-studio-tint text-studio-accent">
                        <Icon icon={tool.icon} size={22} />
                      </span>
                      <span className={soonPill}>Coming soon</span>
                    </span>
                    <span className="text-[13px] font-semibold tracking-[0.12em] text-studio-accent">
                      0{index + 1}
                    </span>
                    <h2 className="m-0 text-[24px] font-medium tracking-[-0.02em] text-studio-text">
                      {tool.title}
                    </h2>
                    <p className="m-0 text-[15px] leading-[1.65] text-studio-muted">
                      {tool.note}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-8 rounded-[22px] border border-studio-line bg-studio-surface p-[34px]">
                <div>
                  <h2 className="m-0 mb-2 text-[24px] font-medium tracking-[-0.03em] text-studio-text">
                    Built one step at a time.
                  </h2>
                  <p className="m-0 max-w-[560px] text-[15px] text-studio-muted">
                    New tools will appear here as they are ready. Nothing on
                    this page is available yet.
                  </p>
                </div>
                <button className={btnPrimary} onClick={() => setSection("home")}>
                  Back to overview
                  <Icon icon={ArrowRight01Icon} size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProjectCard({
  item,
  onOpen,
  onDelete,
}: {
  item: Project;
  onOpen: () => void;
  onDelete?: () => void;
}) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-[18px] border border-studio-line bg-studio-surface transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-studio-line-strong hover:shadow-studio-card">
      <button
        className="relative grid h-[208px] w-full cursor-pointer place-items-center border-0 bg-studio-surface-soft"
        onClick={onOpen}
        aria-label={`Open ${item.name}`}
      >
        <MiniQr
          data={payloadFor(item.kind, item.content)}
          color={item.foreground}
          background={item.background}
          styleType={item.dotStyle}
          size={124}
        />
        <span className="absolute right-4 bottom-4 grid h-[38px] w-[38px] place-items-center rounded-full border border-studio-line bg-studio-surface text-studio-text opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
          <Icon icon={ArrowRight01Icon} size={19} />
        </span>
      </button>
      <div className="flex items-center justify-between gap-4 px-[22px] py-5">
        <div className="min-w-0">
          <h3 className="m-0 mb-1 truncate text-[16px] font-semibold tracking-[-0.01em] text-studio-text">
            {item.name}
          </h3>
          <p className="m-0 text-[13px] text-studio-muted">
            {item.kind} · Updated {new Date(item.updated).toLocaleDateString()}
          </p>
        </div>
        {onDelete && (
          <button
            className="grid h-[38px] w-[38px] flex-none cursor-pointer place-items-center rounded-[10px] border-0 bg-transparent text-[20px] text-studio-muted transition-[background,color] duration-200 ease-out hover:bg-studio-surface-soft hover:text-studio-text"
            onClick={onDelete}
            aria-label={`Delete ${item.name}`}
          >
            ×
          </button>
        )}
      </div>
    </article>
  );
}

function TemplateCard({
  template,
  onClick,
}: {
  template: (typeof templates)[number];
  onClick: () => void;
}) {
  return (
    <button
      className="group min-w-0 cursor-pointer overflow-hidden rounded-[18px] border border-studio-line bg-studio-surface p-0 text-left text-studio-text transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-studio-line-strong hover:shadow-studio-card"
      onClick={onClick}
    >
      <div
        className="relative grid h-[230px] place-items-center overflow-hidden"
        style={{ background: template.bg }}
      >
        <MiniQr
          data={`https://qraft.studio/${template.name.toLowerCase().replaceAll(" ", "-")}`}
          color={template.color}
          background={template.bg}
          styleType={template.style}
          size={128}
        />
        <span className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-full border border-studio-line bg-studio-surface px-3.5 py-1.5 text-[13px] font-medium text-studio-text opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
          Use template
          <Icon icon={ArrowRight01Icon} size={16} />
        </span>
      </div>
      <div className="px-[22px] pt-5 pb-[22px]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-studio-accent">
          {template.category}
        </span>
        <h3 className="mt-1.5 mb-[5px] text-[17px] font-semibold text-studio-text">
          {template.name}
        </h3>
        <p className="m-0 text-[14px] text-studio-muted">{template.note}</p>
      </div>
    </button>
  );
}
