import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import StatsCard from "../Components/dashboard/StatsCard";
import EscriturasList from "../Components/dashboard/EscriturasList";

export default function Dashboard() {
  const { data: escrituras = [], isLoading } = useQuery({
    queryKey: ['escrituras'],
    queryFn: () => base44.entities.Escritura.list("-created_date", 50),
    initialData: [],
  });

  const stats = {
    total: escrituras.length,
    aguardando: escrituras.filter(e => e.status === 'aguardando_revisao').length,
    aprovadas: escrituras.filter(e => e.status === 'aprovada').length,
    processando: escrituras.filter(e => e.status === 'processando').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de escrituras</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Escrituras"
            value={stats.total}
            icon={FileText}
            bgColor="bg-[#1e3a5f]"
            delay={0}
          />
          <StatsCard
            title="Aguardando Revisão"
            value={stats.aguardando}
            icon={Clock}
            bgColor="bg-[#d4af37]"
            delay={0.1}
          />
          <StatsCard
            title="Aprovadas"
            value={stats.aprovadas}
            icon={CheckCircle}
            bgColor="bg-green-600"
            delay={0.2}
          />
          <StatsCard
            title="Processando"
            value={stats.processando}
            icon={AlertCircle}
            bgColor="bg-blue-600"
            delay={0.3}
          />
        </div>

        <EscriturasList escrituras={escrituras} isLoading={isLoading} />
      </div>
    </div>
  );
}
