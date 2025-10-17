import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Textarea } from "../Components/ui/textarea";
import { Badge } from "../Components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Edit3, Save, FileText, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../Components/ui/alert";
import { motion } from "framer-motion";
import DeclaracoesExternas from "../Components/revisao/DeclaracoesExternas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../Components/ui/dialog";

const tipoLabels = {
  compra_venda: "Compra e Venda",
  doacao: "Doação",
  uniao_estavel: "União Estável",
  pacto_antenupcial: "Pacto Antenupcial",
  divorcio: "Divórcio",
  inventario_partilha: "Inventário e Partilha",
  cessao_direitos: "Cessão de Direitos",
  outro: "Outro"
};

// Função mock para criar URLs de página
function createPageUrl(page) {
  return `/${page}`;
}

// Mock de escritura
const mockEscritura = {
  id: "1",
  numero_protocolo: "PROT-123456789",
  tipo: "compra_venda",
  tipo_outro: "",
  valor_negocio: 500000,
  status: "aguardando_revisao",
  partes_envolvidas: "João Silva e Maria Santos",
  observacoes: "Documentos conferidos.",
  documentos_urls: ["#doc1", "#doc2"],
  conteudo_gerado: "Conteúdo gerado da escritura...",
  revisado_por: "usuario@exemplo.com",
  data_revisao: new Date().toISOString(),
  motivo_rejeicao: ""
};

export default function Revisao() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const escrituraId = urlParams.get('id');

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [user] = useState({ full_name: "Usuário Exemplo", email: "usuario@exemplo.com" });
  const [escritura, setEscritura] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento
    setTimeout(() => {
      setEscritura(mockEscritura);
      setEditedContent(mockEscritura.conteudo_gerado);
      setIsLoading(false);
    }, 800);
  }, [escrituraId]);

  const handleSaveEdit = async () => {
    setEscritura(prev => ({ ...prev, conteudo_gerado: editedContent, status: "em_revisao" }));
    setIsEditing(false);
  };

  const handleApprove = async () => {
    setEscritura(prev => ({
      ...prev,
      status: "aprovada",
      revisado_por: user?.email,
      data_revisao: new Date().toISOString(),
      conteudo_gerado: editedContent
    }));
    setTimeout(() => navigate(createPageUrl("Dashboard")), 800);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      return;
    }
    setEscritura(prev => ({
      ...prev,
      status: "rejeitada",
      revisado_por: user?.email,
      data_revisao: new Date().toISOString(),
      motivo_rejeicao: rejectReason
    }));
    setShowRejectDialog(false);
    setTimeout(() => navigate(createPageUrl("Dashboard")), 800);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `escritura_${escritura?.numero_protocolo || 'documento'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!escrituraId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>ID da escritura não especificado</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando escritura...</p>
        </div>
      </div>
    );
  }

  if (!escritura) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>Escritura não encontrada</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Dashboard"))}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Revisão de Escritura</h1>
            <p className="text-gray-600">Protocolo: {escritura.numero_protocolo}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#1e3a5f]" />
                    Conteúdo da Escritura
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        className="bg-[#1e3a5f]"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {isEditing ? (
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="min-h-[600px] font-mono text-sm"
                  />
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800 bg-gray-50 p-6 rounded-lg">
                      {editedContent}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>

            {escritura.status !== "aprovada" && escritura.status !== "rejeitada" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-end"
              >
                <Button
                  variant="outline"
                  onClick={() => setShowRejectDialog(true)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
                <Button
                  onClick={handleApprove}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar Escritura
                </Button>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="text-lg">Informações</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tipo</p>
                  <Badge className="bg-[#1e3a5f] text-white">
                    {tipoLabels[escritura.tipo] || escritura.tipo_outro}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <Badge className={
                    escritura.status === "aprovada" ? "bg-green-100 text-green-800" :
                    escritura.status === "rejeitada" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {escritura.status.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                </div>

                {escritura.partes_envolvidas && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Partes</p>
                    <p className="text-sm font-medium">{escritura.partes_envolvidas}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Criado em</p>
                  <p className="text-sm font-medium">
                    {new Date().toLocaleString('pt-BR')}
                  </p>
                </div>

                {escritura.revisado_por && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Revisado por</p>
                    <p className="text-sm font-medium">{escritura.revisado_por}</p>
                  </div>
                )}

                {escritura.observacoes && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Observações</p>
                    <p className="text-sm">{escritura.observacoes}</p>
                  </div>
                )}

                {escritura.motivo_rejeicao && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Motivo da Rejeição</p>
                    <p className="text-sm text-red-600">{escritura.motivo_rejeicao}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Componente mock DeclaracoesExternas */}
            <DeclaracoesExternas escritura={escritura} />

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="text-lg">Documentos Anexados</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {escritura.documentos_urls?.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FileText className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium flex-1">
                        Documento {index + 1}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Escritura</DialogTitle>
            <DialogDescription>
              Por favor, informe o motivo da rejeição para que seja corrigida.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Descreva os problemas encontrados..."
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleReject}
              disabled={!rejectReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
