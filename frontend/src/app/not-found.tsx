import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-3xl flex items-center justify-center border border-amber-200">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">पृष्ठ सापडले नाही (Page Not Found)</h2>
      <p className="text-xs text-slate-600 max-w-xs">
        आपण शोधत असलेले पृष्ठ उपलब्ध नाही. कृपया मुख्य पृष्ठावर जा.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-emerald-700"
      >
        <Home className="w-4 h-4" />
        <span>मुख्य पृष्ठ (Home)</span>
      </Link>
    </div>
  );
}
