import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Params {
  github: string;
  leetcode: string;
}

function GithubMark({ size: s = 28 }: { size?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 16 16">
      <path
        fill="#ffffff"
        d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"
      />
    </svg>
  );
}

function LeetcodeMark({ size: s = 28 }: { size?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path
        fill="#9ca3af"
        d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
      />
      <path
        fill="#d1d5db"
        d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
      />
      <path
        fill="#ffffff"
        d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
      />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 88,
        borderRadius: 20,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#fff" }}>{value}</div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
          marginTop: 6,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Bar({
  mark,
  value,
  label,
  fraction,
  fill,
}: {
  mark: React.ReactNode;
  value: number;
  label: string;
  fraction: number;
  fill: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 120 }}>
      <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: "#fff" }}>{value}</div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          width: 36,
          height: 90,
          marginTop: 10,
          borderRadius: 18,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${Math.max(fraction, 0.06) * 100}%`,
            borderRadius: 18,
            background: fill,
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: 12 }}>{mark}</div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.5)",
          marginTop: 8,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FallbackCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        color: "white",
        fontSize: 56,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      compareCode
    </div>
  );
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { github, leetcode } = await params;

  try {
    const { github: gh, leetcode: lc, score } = await getProfile(github, leetcode);
    const maxMetric = Math.max(gh.totalContributions, lc.totalSolved, 1);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 64,
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: 48,
              borderRadius: 36,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* header */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={gh.avatarUrl}
                alt=""
                width={84}
                height={84}
                style={{
                  borderRadius: "50%",
                  marginRight: 24,
                  border: "3px solid rgba(255,255,255,0.2)",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{gh.name ?? github}</div>
                <div style={{ display: "flex", fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                  <span style={{ marginRight: 16 }}>{`@${github}`}</span>
                  <span>{`@${leetcode}`}</span>
                </div>
              </div>
            </div>

            {/* headline + bars */}
            <div style={{ display: "flex", marginTop: 32, justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 60, fontWeight: 800 }}>
                  <span style={{ marginRight: 14 }}>{`${score.shipPercent}%`}</span>
                  <span style={{ color: "#9ca3af" }}>Shipper</span>
                </div>
                <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                  <span>{`vs ${score.solvePercent}% Solver · ${score.verdict}`}</span>
                </div>

                {/* split bar */}
                <div
                  style={{
                    display: "flex",
                    height: 14,
                    borderRadius: 10,
                    overflow: "hidden",
                    marginTop: 24,
                    width: 460,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${score.shipPercent}%`,
                      background: "#ffffff",
                    }}
                  />
                  <div
                    style={{
                      height: "100%",
                      width: `${score.solvePercent}%`,
                      background: "#6b7280",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 28 }}>
                <Bar
                  mark={<GithubMark />}
                  value={gh.totalContributions}
                  label="Commits"
                  fraction={gh.totalContributions / maxMetric}
                  fill="#2ea043"
                />
                <Bar
                  mark={<LeetcodeMark />}
                  value={lc.totalSolved}
                  label="Solved"
                  fraction={lc.totalSolved / maxMetric}
                  fill="#ffa116"
                />
              </div>
            </div>

            {/* stats row */}
            <div style={{ display: "flex", marginTop: 36, justifyContent: "space-between" }}>
              <Stat label="Streak" value={`${gh.currentStreak}d`} />
              <Stat label="Stars" value={gh.totalStars} />
              <Stat label="Top Lang" value={gh.topLanguage ?? "—"} />
              <Stat
                label="LC Rank"
                value={lc.ranking ? `#${lc.ranking.toLocaleString("en-US")}` : "—"}
              />
            </div>

            {/* footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "auto",
                paddingTop: 28,
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <span>comparecode.app</span>
              <span>{`Easy ${lc.easySolved} · Med ${lc.mediumSolved} · Hard ${lc.hardSolved}`}</span>
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  } catch {
    return new ImageResponse(<FallbackCard />, { ...size });
  }
}
