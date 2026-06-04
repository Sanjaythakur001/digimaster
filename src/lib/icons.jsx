import {
  Rocket, Users, Globe, Search, PenTool, Target, Facebook, Share2, Mail,
  MousePointerClick, Filter, BarChart3, Workflow, BookMarked, BookOpen,
  Sparkles, Trophy, Zap, TrendingUp, Map, Gamepad2, Network,
  Link2, FileText, Megaphone, Video, ShoppingBag, Image, Layers, FolderTree,
  Tag, Database, Eye, Gauge, MapPin, Brain, Percent, Repeat, UserPlus,
  UserCheck, User, ClipboardList, CalendarDays, Star, ShieldCheck, LineChart,
  PieChart, KeyRound, ListChecks, Crosshair, Send, Wrench, Building2,
  Smartphone, Award, CircleDollarSign, MousePointer2, Lightbulb,
  SplitSquareHorizontal, Compass,
} from 'lucide-react'

const map = {
  Rocket, Users, Globe, Search, PenTool, Target, Facebook, Share2, Mail,
  MousePointerClick, Filter, BarChart3, Workflow, BookMarked, BookOpen,
  Sparkles, Trophy, Zap, TrendingUp, Map, Gamepad2, Network,
  Link2, FileText, Megaphone, Video, ShoppingBag, Image, Layers, FolderTree,
  Tag, Database, Eye, Gauge, MapPin, Brain, Percent, Repeat, UserPlus,
  UserCheck, User, ClipboardList, CalendarDays, Star, ShieldCheck, LineChart,
  PieChart, KeyRound, ListChecks, Crosshair, Send, Wrench, Building2,
  Smartphone, Award, CircleDollarSign, MousePointer2, Lightbulb,
  SplitSquareHorizontal, Compass,
}

export function Icon({ name, ...props }) {
  const Cmp = map[name] || BookOpen
  return <Cmp {...props} />
}

export const colorClasses = {
  blue: { text: 'text-brand-blue', bg: 'bg-brand-blue', bgSoft: 'bg-brand-blue/10', border: 'border-brand-blue/40', ring: 'ring-brand-blue/40', grad: 'from-brand-blue to-blue-400' },
  green: { text: 'text-brand-green', bg: 'bg-brand-green', bgSoft: 'bg-brand-green/10', border: 'border-brand-green/40', ring: 'ring-brand-green/40', grad: 'from-brand-green to-emerald-400' },
  orange: { text: 'text-brand-orange', bg: 'bg-brand-orange', bgSoft: 'bg-brand-orange/10', border: 'border-brand-orange/40', ring: 'ring-brand-orange/40', grad: 'from-brand-orange to-amber-400' },
  purple: { text: 'text-brand-purple', bg: 'bg-brand-purple', bgSoft: 'bg-brand-purple/10', border: 'border-brand-purple/40', ring: 'ring-brand-purple/40', grad: 'from-brand-purple to-fuchsia-400' },
}
