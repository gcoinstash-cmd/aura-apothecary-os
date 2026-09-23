import React, { useState } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Droplet, 
  Layers, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Search,
  Sliders,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface FormulaCommission {
  id: string;
  formulaCode: string;
  clientName: string;
  clientTier: 'Private Bespoke' | 'Haute Flacon' | 'Atelier Reserve';
  fragranceFamily: string;
  topAccord: string;
  heartAccord: string;
  baseAccord: string;
  concentrationPct: number;
  macerationDays: number;
  macerationTargetDays: number;
  flaconStatus: 'Organ Compounding' | 'Cold Maceration' | 'Micro-Filtration' | 'Hand Bottled' | 'Dispatched';
  depositAmount: number;
  totalPrice: number;
}

const MOCK_COMMISSIONS: FormulaCommission[] = [
  {
    id: 'f-1',
    formulaCode: 'FORMULA-AUR-019',
    clientName: 'Countess Eléonore de Rohan',
    clientTier: 'Private Bespoke',
    fragranceFamily: 'Smoky Amber Floral',
    topAccord: 'Calabrian Bergamot & Pink Peppercorn',
    heartAccord: 'Grasse Rose de Mai & Papyrus Extract',
    baseAccord: 'Mysore Sandalwood Album & Ambergris',
    concentrationPct: 28, // Extrait de Parfum
    macerationDays: 42,
    macerationTargetDays: 60,
    flaconStatus: 'Cold Maceration',
    depositAmount: 1800,
    totalPrice: 4200
  },
  {
    id: 'f-2',
    formulaCode: 'FORMULA-AUR-020',
    clientName: 'Julian Sterling, Esq.',
    clientTier: 'Haute Flacon',
    fragranceFamily: 'Mineral Ozonic Leather',
    topAccord: 'Frozen Aldehydes & Mountain Ash',
    heartAccord: 'Mineral Charcoal & Damask Rose',
    baseAccord: 'Scorched Birch Tar & White Suede',
    concentrationPct: 24,
    macerationDays: 58,
    macerationTargetDays: 60,
    flaconStatus: 'Micro-Filtration',
    depositAmount: 1200,
    totalPrice: 2800
  },
  {
    id: 'f-3',
    formulaCode: 'FORMULA-AUR-021',
    clientName: 'Amara Vance',
    clientTier: 'Atelier Reserve',
    fragranceFamily: 'Verdant Earth & Sacred Wood',
    topAccord: 'Siberian Pine Needles & Crushed Mint',
    heartAccord: 'Galbanum Resin & Blue Lotus',
    baseAccord: 'High-Altitude Oakmoss & Omani Frankincense',
    concentrationPct: 30,
    macerationDays: 14,
    macerationTargetDays: 45,
    flaconStatus: 'Organ Compounding',
    depositAmount: 2200,
    totalPrice: 5000
  },
  {
    id: 'f-4',
    formulaCode: 'FORMULA-AUR-022',
    clientName: 'Lord George Cavendish',
    clientTier: 'Private Bespoke',
    fragranceFamily: 'Solar Citrus Chypre',
    topAccord: 'Cold-Pressed Neroli & Sicilian Mandarin',
    heartAccord: 'Violet Leaf Absolute & Orris Butter',
    baseAccord: 'Bourbon Vetiver & Cedarwood Flakes',
    concentrationPct: 22,
    macerationDays: 60,
    macerationTargetDays: 60,
    flaconStatus: 'Hand Bottled',
    depositAmount: 1600,
    totalPrice: 3500
  }
];

interface RawMaterial {
  id: string;
  name: string;
  origin: string;
  extraction: string;
  stockGrams: number;
  minThresholdGrams: number;
  costPerGram: number;
  status: 'In Organ' | 'Reserve Vault' | 'Low Inventory';
}

const RAW_ORGAN_INVENTORY: RawMaterial[] = [
  {
    id: 'rm-1',
    name: 'Sandalwood Album Heartwood',
    origin: 'Mysore, India',
    extraction: 'Steam Distilled (Aged 15 Yrs)',
    stockGrams: 850,
    minThresholdGrams: 200,
    costPerGram: 18.50,
    status: 'In Organ'
  },
  {
    id: 'rm-2',
    name: 'Rose de Mai Absolute (Centifolia)',
    origin: 'Grasse, France',
    extraction: 'Volatile Solvent Extraction',
    stockGrams: 320,
    minThresholdGrams: 100,
    costPerGram: 24.00,
    status: 'In Organ'
  },
  {
    id: 'rm-3',
    name: 'Frankincense Sacra Tears',
    origin: 'Dhofar, Oman',
    extraction: 'Hydro-Distillation',
    stockGrams: 1200,
    minThresholdGrams: 300,
    costPerGram: 9.80,
    status: 'In Organ'
  },
  {
    id: 'rm-4',
    name: 'Orris Root Butter (15% Irones)',
    origin: 'Florence, Italy',
    extraction: '3-Year Aged Rhizome Steam Distillation',
    stockGrams: 85,
    minThresholdGrams: 50,
    costPerGram: 65.00,
    status: 'Low Inventory'
  },
  {
    id: 'rm-5',
    name: 'Haitian Vetiver Root (Organic)',
    origin: 'Les Cayes, Haiti',
    extraction: 'Fractionated Steam Distillation',
    stockGrams: 2400,
    minThresholdGrams: 500,
    costPerGram: 4.50,
    status: 'Reserve Vault'
  }
];

export default function ParfumeurAdminDashboard({ onExit }: { onExit: () => void }) {
  const [activeTab, setActiveTab] = useState<'commissions' | 'inventory' | 'telemetry'>('commissions');
  const [searchTerm, setSearchTerm] = useState('');

  const totalCommissionsValue = MOCK_COMMISSIONS.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalDepositsCollected = MOCK_COMMISSIONS.reduce((sum, item) => sum + item.depositAmount, 0);

  const filteredCommissions = MOCK_COMMISSIONS.filter(item => 
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.formulaCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fragranceFamily.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E4E4E7] font-sans">
      {/* Top Telemetry Header */}
      <header className="border-b border-[#27272A] bg-[#121215]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30">
              <FlaskConical className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-lg tracking-widest text-white uppercase">AURA ATELIER OS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MASTER ORGAN PORTAL
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">Haute Parfumerie Maceration & Raw Volatiles Vault</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-zinc-400">
              <div>
                <span className="text-zinc-500">PIPELINE VALUE: </span>
                <span className="text-emerald-400 font-semibold">${totalCommissionsValue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-zinc-500">DEPOSITS: </span>
                <span className="text-white font-semibold">${totalDepositsCollected.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onExit}
              className="flex items-center space-x-2 text-xs font-mono tracking-wider uppercase bg-[#1C1C21] hover:bg-[#27272A] text-zinc-300 hover:text-white px-4 py-2 border border-[#2E2E35] transition-all cursor-pointer"
            >
              <span>Back to Storefront</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 flex space-x-8 text-xs font-mono">
          <button
            onClick={() => setActiveTab('commissions')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'commissions'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Formulation Queue ({MOCK_COMMISSIONS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>Raw Volatiles Organ ({RAW_ORGAN_INVENTORY.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'telemetry'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Atelier Economics</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'commissions' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141418] p-4 border border-[#27272A]">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter formulas, clients, or accords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#1C1C21] border border-[#27272A] pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>4 Active Compounding Vats</span>
              </div>
            </div>

            {/* Commissions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCommissions.map((comm) => (
                <div 
                  key={comm.id}
                  className="bg-[#141418] border border-[#27272A] hover:border-amber-500/40 p-6 transition-all space-y-5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-mono text-amber-400">{comm.formulaCode}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#222228] text-zinc-300">
                          {comm.clientTier}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-white font-medium">{comm.clientName}</h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">{comm.fragranceFamily}</p>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-[11px] font-mono px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {comm.flaconStatus}
                      </span>
                      <p className="text-xs font-mono text-zinc-500 mt-1">
                        {comm.concentrationPct}% Concentration (Extrait)
                      </p>
                    </div>
                  </div>

                  {/* Accords Breakdown */}
                  <div className="bg-[#1A1A20] p-3 space-y-1.5 border border-[#24242C] text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">[TOP ACCORD]</span>
                      <span className="text-zinc-300 text-right">{comm.topAccord}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">[HEART ACCORD]</span>
                      <span className="text-zinc-300 text-right">{comm.heartAccord}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">[BASE ACCORD]</span>
                      <span className="text-amber-200/90 text-right">{comm.baseAccord}</span>
                    </div>
                  </div>

                  {/* Maceration Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-zinc-400">Cold Aging Maceration</span>
                      <span className="text-amber-400">
                        Day {comm.macerationDays} of {comm.macerationTargetDays} ({Math.round((comm.macerationDays / comm.macerationTargetDays) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#27272A] h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.round((comm.macerationDays / comm.macerationTargetDays) * 100))}%` }}
                      />
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-2 border-t border-[#24242C] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-zinc-500">Deposit Paid: </span>
                      <span className="text-white font-medium">${comm.depositAmount}</span>
                      <span className="text-zinc-500 ml-2">Total: </span>
                      <span className="text-emerald-400 font-medium">${comm.totalPrice}</span>
                    </div>

                    <button 
                      onClick={() => alert(`Logged sampling test for ${comm.formulaCode}. Specific gravity: 0.884, alcohol purity: 96%.`)}
                      className="px-3 py-1 bg-[#222228] hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-[#2E2E35] transition-all cursor-pointer"
                    >
                      Log Organ Assay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-[#141418] p-6 border border-[#27272A]">
              <h3 className="font-serif text-lg text-white mb-2">Master Organ Raw Materials Ledger</h3>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                Rare natural absolutes, steam-distilled essential oils, and certified sustainable synthetic amber accords.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#27272A] text-zinc-500">
                      <th className="pb-3 uppercase tracking-wider">Botanical / Essence</th>
                      <th className="pb-3 uppercase tracking-wider">Terroir & Origin</th>
                      <th className="pb-3 uppercase tracking-wider">Extraction Method</th>
                      <th className="pb-3 uppercase tracking-wider">Organ Stock</th>
                      <th className="pb-3 uppercase tracking-wider">Cost / Gram</th>
                      <th className="pb-3 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F24]">
                    {RAW_ORGAN_INVENTORY.map((rm) => (
                      <tr key={rm.id} className="hover:bg-[#1A1A20] transition-colors">
                        <td className="py-4 font-medium text-white">{rm.name}</td>
                        <td className="py-4 text-zinc-400">{rm.origin}</td>
                        <td className="py-4 text-zinc-400">{rm.extraction}</td>
                        <td className="py-4 font-semibold text-zinc-200">
                          {rm.stockGrams}g 
                          <span className="text-[10px] text-zinc-500 ml-1 font-normal">(Min: {rm.minThresholdGrams}g)</span>
                        </td>
                        <td className="py-4 text-amber-300">${rm.costPerGram.toFixed(2)}</td>
                        <td className="py-4">
                          <span className={`text-[10px] px-2 py-0.5 ${
                            rm.status === 'Low Inventory' 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          }`}>
                            {rm.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141418] p-6 border border-[#27272A] space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Average Flacon Retainer</span>
              <p className="font-serif text-3xl text-white font-medium">$3,875</p>
              <p className="text-[11px] font-mono text-emerald-400">↑ 18% vs standard niche luxury perfume</p>
            </div>
            <div className="bg-[#141418] p-6 border border-[#27272A] space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Active Maceration Volume</span>
              <p className="font-serif text-3xl text-white font-medium">18.4 Liters</p>
              <p className="text-[11px] font-mono text-zinc-400">Aging at 4°C in sealed borosilicate glass</p>
            </div>
            <div className="bg-[#141418] p-6 border border-[#27272A] space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Grasse Supply Line Status</span>
              <p className="font-serif text-3xl text-emerald-400 font-medium">100% Certified</p>
              <p className="text-[11px] font-mono text-zinc-400">IFRA 51st Amendment Compliant</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
