import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Upload, FileText, X, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "../Components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tiposEscritura = [
  { value: "compra_venda", label: "Compra e Venda" },
  { value: "doacao", label: "Doação" },
  { value: "uniao_estavel", label: "União Estável" },
  { value: "pacto_antenupcial", label: "Pacto Antenupcial" },
  { value: "divorcio", label: "Divórcio" },
  { value: "inventario_partilha", label: "Inventário e Partilha" },
  { value: "cessao_direitos", label: "Cessão de Direitos" },
  { value: "outro", label: "Outro" }
];

const tiposComValor = ["compra_venda", "doacao", "inventario_partilha", "cessao_direitos"];

// Função mock para criar URLs de página
function createPageUrl(page) {
  return `/${page}`;
}

export default function NovaEscritura() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [tipo, setTipo] = useState("");
  const [tipoOutro, setTipoOutro] = useState("");
  const [partes, setPartes] = useState("");
  const [valorNegocio, setValorNegocio] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    );
    if (droppedFiles.length === 0) {
      setError("Por favor, envie apenas arquivos PDF");
      return;
    }
    setFiles(prev => [...prev, ...droppedFiles]);
    setError(null);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === "application/pdf"
    );
    if (selectedFiles.length === 0) {
      setError("Por favor, envie apenas arquivos PDF");
      return;
    }
    setFiles(prev => [...prev, ...selectedFiles]);
    setError(null);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipo) {
      setError("Por favor, selecione o tipo de escritura");
      return;
    }
    if (tipo === "outro" && !tipoOutro) {
      setError("Por favor, especifique o tipo da escritura");
      return;
    }
    if (files.length === 0) {
      setError("Por favor, envie pelo menos um documento");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setUploadProgress(20);
    // Simulação de processamento
    setTimeout(() => {
      setUploadProgress(60);
      setTimeout(() => {
        setUploadProgress(100);
        setTimeout(() => {
          navigate(createPageUrl("Dashboard"));
        }, 800);
      }, 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Nova Escritura</h1>
          <p className="text-gray-600">Envie os documentos e deixe a IA gerar a escritura (simulado)</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isProcessing ? (
          <Card className="border-none shadow-xl">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 mx-auto"
                >
                  <Sparkles className="w-20 h-20 text-[#d4af37]" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Processando Escritura...
                  </h3>
                  <p className="text-gray-600">A IA está analisando os documentos e gerando a escritura (simulado)</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1e3a5f] to-[#d4af37]"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-500">{uploadProgress}% concluído</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#1e3a5f]" />
                  Informações da Escritura
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Escritura *</Label>
                    <Select value={tipo} onValueChange={setTipo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposEscritura.map(t => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {tipo === "outro" && (
                    <div className="space-y-2">
                      <Label htmlFor="tipoOutro">Especifique o Tipo *</Label>
                      <Input
                        id="tipoOutro"
                        value={tipoOutro}
                        onChange={(e) => setTipoOutro(e.target.value)}
                        placeholder="Ex: Escritura de Permuta"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="partes">Partes Envolvidas</Label>
                    <Input
                      id="partes"
                      value={partes}
                      onChange={(e) => setPartes(e.target.value)}
                      placeholder="Ex: João Silva e Maria Santos"
                    />
                  </div>
                  
                  {tiposComValor.includes(tipo) && (
                    <div className="space-y-2">
                      <Label htmlFor="valorNegocio">Valor do Negócio/Bem (R$)</Label>
                      <Input
                        id="valorNegocio"
                        type="number"
                        step="0.01"
                        value={valorNegocio}
                        onChange={(e) => setValorNegocio(e.target.value)}
                        placeholder="Ex: 500000.00"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Informações adicionais que a IA deve considerar..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-6 h-6 text-[#1e3a5f]" />
                  Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
                    dragActive ? "border-[#1e3a5f] bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Arraste os PDFs aqui
                  </h3>
                  <p className="text-gray-600 mb-4">ou</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Selecionar Arquivos
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">
                    Apenas arquivos PDF • Máximo 10 arquivos
                  </p>
                </div>

                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-3"
                    >
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 bg-white border rounded-xl hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-red-500" />
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(createPageUrl("Dashboard"))}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] hover:from-[#2d5a8f] hover:to-[#1e3a5f]"
                disabled={!tipo || files.length === 0}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Escritura com IA
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
