import Image from "next/image";
import { Allura, Poppins } from "next/font/google";
import { Calendar, MapPin, Star, Users, Award, Sparkles, Phone, Mail, Globe } from "lucide-react";

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

// Decorative script face reserved for role / title text — gives the person's
// designation its own visual voice instead of blending into the paragraph.
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Clean geometric sans for names — carries the weight and clarity a name needs.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const leadership = [
  {
    name: "Hon'ble Dr. Shivajirao Kadam",
    role: "Chancellor",
    org: "Bharati Vidyapeeth",
    image: "/chancellor.png",
    accent: "bg-violet-500",
    roleGradient: "from-violet-600 to-fuchsia-500",
  },
  {
    name: "Hon'ble Dr. Vishwajeet Kadam",
    role: "Pro Vice-Chancellor",
    org: "Bharati Vidyapeeth",
    image: "/vishwajeet-kadam.jpg",
    accent: "bg-sky-500",
    roleGradient: "from-sky-600 to-blue-500",
  },
  {
    name: "Hon'ble Dr. Vivek Saoji",
    role: "Vice-Chancellor",
    org: "Bharati Vidyapeeth",
    image: "/vivek-saoji.jpg",
    accent: "bg-teal-500",
    roleGradient: "from-teal-600 to-emerald-500",
  },
];

const chairmen = [
  {
    name: "Dr. Rajesh Prasad",
    role: "Principal",
    org: "Bharati Vidyapeeth College of Engineering, Pune",
    image: "/principal.jpeg",
  },
  {
    name: "Dr. Sachin Chavan",
    role: "Vice Principal",
    org: "Bharati Vidyapeeth College of Engineering, Pune",
    image: "/vice-principal.jpeg",
  },
  {
    name: "Dr. Sunita Jadhav",
    role: "Vice-Principal",
    org: "Bharati Vidyapeeth College of Engineering, Pune",
    image: "/sunita-jadhav.jpeg",
  },
];

const committee = [
  {
    name: "Dr. Bindu Garg",
    role: "Head & Professor",
    org: "Department of CSE",
    image: "/hod.png",
    phone: null,
    accent: true,
  },
  {
    name: "Dr. Manisha Kasar",
    role: "Coordinator, Associate Professor",
    org: "Department of CSE",
    image: "/manisha-mam.png",
    phone: "7588314185",
    accent: false,
  },
  {
    name: "Prof. Trupti Suryawanshi",
    role: "Co-Coordinator, Assistant Professor",
    org: "Department of CSE",
    image: "/trupti-mam.jpeg",
    phone: "9890395400",
    accent: false,
  },
  {
    name: "Prof. Bharat Devhare",
    role: "Assistant Professor",
    org: "Department of CSE",
    image: "/bharat-devhare.jpeg",
    phone: "9657252769",
    accent: false,
  },
  {
    name: "Prof. Rohini Patil",
    role: "Assistant Professor",
    org: "Department of CSE",
    image: "/rohini-aptil.jpeg",
    phone: "9689616039",
    accent: false,
  },
  {
    name: "Prof. Yash Kolhe",
    role: "Assistant Professor",
    org: "Department of CSE",
    image: "/yash-kolhe.jpeg",
    phone: "8446612074",
    accent: false,
  },
];

const navLinks = ["Home", "About", "Tracks", "Timeline", "Prizes", "FAQs"];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function SectionEyebrow({
  icon: Icon,
  children,
  iconWrapClass,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  iconWrapClass: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${iconWrapClass}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
        {children}
      </h2>
    </div>
  );
}

function LeadershipCard({
  name,
  role,
  org,
  image,
  accent,
  roleGradient,
}: (typeof leadership)[number]) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-[#FAFAF7] px-6 pb-7 pt-8 text-center shadow-sm shadow-slate-100">
      <div className="mb-6 h-44 w-44 sm:h-48 sm:w-48 overflow-hidden rounded-full ring-[6px] ring-slate-50">
        <Image
          src={image}
          alt={name}
          width={192}
          height={192}
          className="h-full w-full object-cover"
        />
      </div>
      <p className={`${poppins.className} text-lg font-bold leading-snug text-slate-900`}>
        {name}
      </p>
      <p
        className={`${allura.className} mt-1.5 bg-gradient-to-r ${roleGradient} bg-clip-text text-[28px] leading-tight text-transparent`}
      >
        {role}
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {org}
      </p>
      <span className={`mt-4 block h-[3px] w-10 rounded-full ${accent}`} />
    </div>
  );
}

function ChairmanCard({ name, role, org, image }: (typeof chairmen)[number]) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-[#FAFAF7] p-5 shadow-sm shadow-slate-100">
      <div className="h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-full ring-[3px] ring-orange-100">
        <Image
          src={image}
          alt={name}
          width={144}
          height={144}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className={`${poppins.className} text-lg font-bold leading-snug text-slate-900`}>
          {name}
        </p>
        <p
          className={`${allura.className} mt-1 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-[26px] leading-tight text-transparent`}
        >
          {role}
        </p>
        <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {org}
        </p>
        <span className="mt-3 block h-[3px] w-10 rounded-full bg-orange-400" />
      </div>
    </div>
  );
}

function CommitteeCard({ name, role, org, image, phone, accent }: (typeof committee)[number]) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-[#FAFAF7] p-5 shadow-sm shadow-slate-100">
      <div className="h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-full ring-[3px] ring-teal-100">
        <Image
          src={image}
          alt={name}
          width={144}
          height={144}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold tracking-tight text-slate-900">{name}</p>
        <span className="mt-1.5 inline-block rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
          {role}
        </span>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {org}
        </p>
        {phone && (
          <div className="mt-2.5 flex items-center gap-1.5 text-sm font-medium text-teal-600">
            <Phone className="h-3.5 w-3.5" />
            <span>{phone}</span>
          </div>
        )}
        {accent && <span className="mt-3 block h-[3px] w-10 rounded-full bg-teal-400" />}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrganizingCommitteePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 pt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-teal-600">
              THE TEAM BEHIND THE HACKATHON
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-[2.6rem]">
              Meet the People
              <br />
              Driving Global
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text text-transparent">
                SDG-AI Hackathon 2026
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-500">
              Behind every successful innovation platform is a dedicated team
              of educators, researchers, and leaders. The Global SDG-AI
              Hackathon 2026 is guided by experienced academic leadership and
              organized by the Department of Computer Science &amp;
              Engineering, Bharati Vidyapeeth College of Engineering, Pune.
            </p>

            <div className="mt-7 flex max-w-md flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-100 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Calendar className="h-4 w-4" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">25–27</p>
                  <p className="text-slate-400">September 2026</p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-slate-100 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">
                    Bharati Vidyapeeth (Deemed to be University)
                  </p>
                  <p className="text-slate-400">College of Engineering, Pune, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[420px] w-full">
            {/* decorative dotted grid + soft blob, sit behind the photos */}
            <div className="pointer-events-none absolute right-0 top-2 grid grid-cols-6 gap-1.5 opacity-40">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-slate-300" />
              ))}
            </div>
            <div className="pointer-events-none absolute -left-6 bottom-6 h-48 w-48 rounded-full bg-teal-100/50 blur-2xl" />

            <div className="absolute right-0 top-0 h-52 w-72 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/bharati2.webp"
                alt="Bharati Vidyapeeth College of Engineering building"
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-0 top-28 h-64 w-56 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/bharati2.jpeg"
                alt="Bharati Vidyapeeth campus"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-4 h-48 w-64 overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/life.png"
                alt="Organizing team in a meeting"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <div className="w-full overflow-hidden rounded-3xl pt-12">
          <Image
            src="/inspiration.png"
            alt="Global SDG-AI Hackathon inspiration"
            width={1600}
            height={800}
            sizes="100vw"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Leadership                                                        */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-20">
          <SectionEyebrow icon={Sparkles} iconWrapClass="bg-violet-50 text-violet-500">
            Leadership
          </SectionEyebrow>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {leadership.map((person) => (
              <LeadershipCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Program Chairmen                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-20">
          <SectionEyebrow icon={Award} iconWrapClass="bg-orange-50 text-orange-500">
            Program Chairmen of the Hackathon
          </SectionEyebrow>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {chairmen.map((person) => (
              <ChairmanCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Organizing Committee                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-20">
          <SectionEyebrow icon={Users} iconWrapClass="bg-teal-50 text-teal-500">
            Organizing Committee
          </SectionEyebrow>
          <p className="mb-7 max-w-full text-[15px] leading-relaxed text-slate-500">
            The organizing committee comprises dedicated faculty members from the Department of Computer Science &amp; Engineering, Bharati Vidyapeeth College of Engineering, Pune. Together they bring
            expertise in AI, research, and academic coordination to deliver
            an inclusive, innovative, and impactful international hackathon.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committee.map((person) => (
              <CommitteeCard key={person.name} {...person} />
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Contact / We're here to help                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-slate-50 to-teal-50/40 p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-100/70 text-teal-600">
                <Mail className="h-8 w-8" />
              </span>
              <div>
                <span className="text-[11px] font-semibold tracking-wide text-teal-600">
                  NEED ASSISTANCE?
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  We&apos;re Here to Help!
                </h3>
                <p className="mt-1 max-w-sm text-[15px] leading-relaxed text-slate-500">
                  For any queries regarding the Global SDG-AI Hackathon 2026,
                  please reach out to the organizing team.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-[15px] text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-500" />
                <span>cse_pune@bharatividyapeeth.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-teal-500" />
                <span>www.bvcoepune.edu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span>Bharati Vidyapeeth College of Engineering, Pune</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Footer                                                                */}
      {/* -------------------------------------------------------------------- */}
    </main>
  );
}