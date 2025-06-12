interface VitalCardProps {
  title: string;
  value: string | number;
  
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  color?: string;
}
const colorMap = {
  red: {
    text: "text-red-600",
    bg: "bg-red-100",
    badgeText: "text-red-700",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-100",
    badgeText: "text-green-700",
  },
  yellow: {
    text: "text-yellow-600",
    bg: "bg-yellow-100",
    badgeText: "text-yellow-700",
  },
  gray: {
    text: "text-gray-600",
    bg: "bg-gray-100",
    badgeText: "text-gray-700",
  },
  black: {
    text: "text-black",
    bg: "bg-gray-200", // fallback for "black"
    badgeText: "text-black",
  },
  amber: {
    text: "text-amber-600",
    bg: "bg-amber-100",
    badgeText: "text-amber-700",
  },
  rose: {
    text: "text-rose-600",
    bg: "bg-rose-100",
    badgeText: "text-rose-700",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-100",
    badgeText: "text-purple-700",
  },  emerald: {
    text: "text-emerald-600",
    bg: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
  
};


const VitalCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  color = "gray", // safer default
}: VitalCardProps) => {
  const styles = colorMap[color as keyof typeof colorMap] ?? colorMap.gray;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${styles.text}`} />
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.badgeText}`}>
          {trend === "up" ? "↗ Healthy" : trend === "stable" ? "→ Stable" : "↓ Critical"}
        </div>
      </div>
      <div className="text-sm md:text-xl font-bold text-black mb-1">
        {value}
        {unit}
      </div>
      <div className="text-sm md:text-base text-gray-600">{title}</div>
    </div>
  );
};

export default VitalCard;