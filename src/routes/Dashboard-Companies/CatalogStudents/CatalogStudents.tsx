"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText, GraduationCap, Briefcase, Languages, MapPin } from "lucide-react"

// Datos de ejemplo para estudiantes
const STUDENTS = [
  {
    id: 1,
    name: "Juan Pérez",
    career: "Ingeniería en Sistemas",
    type: "egresado",
    status: "titulado",
    location: "Ciudad de México",
    skills: ["React", "Node.js", "MongoDB"],
    languages: ["Español", "Inglés"],
    experience: "2 años",
    photo: "JP",
  },
  {
    id: 2,
    name: "Ana García",
    career: "Desarrollo de Software",
    type: "egresado",
    status: "no-titulado",
    location: "Guadalajara",
    skills: ["Java", "Spring", "MySQL"],
    languages: ["Español", "Inglés", "Francés"],
    experience: "1 año",
    photo: "AG",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    career: "Ingeniería Informática",
    type: "practicante",
    status: "estudiante",
    location: "Monterrey",
    skills: ["Python", "Django", "PostgreSQL"],
    languages: ["Español", "Inglés"],
    experience: "6 meses",
    photo: "CR",
  },
  {
    id: 4,
    name: "Laura Martínez",
    career: "Ingeniería en Sistemas",
    type: "egresado",
    status: "titulado",
    location: "Ciudad de México",
    skills: ["React", "Angular", "Firebase"],
    languages: ["Español", "Inglés", "Alemán"],
    experience: "3 años",
    photo: "LM",
  },
  {
    id: 5,
    name: "Roberto Sánchez",
    career: "Desarrollo de Software",
    type: "practicante",
    status: "estudiante",
    location: "Puebla",
    skills: ["HTML", "CSS", "JavaScript"],
    languages: ["Español"],
    experience: "Sin experiencia",
    photo: "RS",
  },
  {
    id: 6,
    name: "María López",
    career: "Ingeniería Informática",
    type: "egresado",
    status: "titulado",
    location: "Querétaro",
    skills: ["C#", ".NET", "SQL Server"],
    languages: ["Español", "Inglés"],
    experience: "2 años",
    photo: "ML",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    career: "",
    type: "",
    status: "",
    languages: [] as string[],
  })
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar estudiantes basado en los criterios de búsqueda y filtros
  const filteredStudents = STUDENTS.filter((student) => {
    // Filtro por término de búsqueda
    const matchesSearch =
      searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro por carrera
    const matchesCareer = filters.career === "" || student.career === filters.career

    // Filtro por tipo (practicante/egresado)
    const matchesType = filters.type === "" || student.type === filters.type

    // Filtro por estado (titulado/no titulado/estudiante)
    const matchesStatus = filters.status === "" || student.status === filters.status

    // Filtro por idiomas
    const matchesLanguages =
      filters.languages.length === 0 || filters.languages.every((lang) => student.languages.includes(lang))

    return matchesSearch && matchesCareer && matchesType && matchesStatus && matchesLanguages
  })

  const handleLanguageToggle = (language: string) => {
    setFilters((prev) => {
      const languages = prev.languages.includes(language)
        ? prev.languages.filter((lang) => lang !== language)
        : [...prev.languages, language]
      return { ...prev, languages }
    })
  }

  return (
    <div className="space-y-6 m-3">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Talentos</h1>
        <p className="text-muted-foreground">
          Explora perfiles de estudiantes y egresados para encontrar el talento que necesitas
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, carrera o habilidades..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
          Filtros
          {(filters.career || filters.type || filters.status || filters.languages.length > 0) && (
            <Badge variant="secondary" className="ml-1">
              {[filters.career && "1", filters.type && "1", filters.status && "1", filters.languages.length > 0 && "1"]
                .filter(Boolean)
                .length.toString()}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Búsqueda</CardTitle>
            <CardDescription>Refina tu búsqueda de talento según tus necesidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="career-filter">Carrera</Label>
                <Select
                  value={filters.career}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, career: value }))}
                >
                  <SelectTrigger id="career-filter">
                    <SelectValue placeholder="Todas las carreras" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las carreras</SelectItem>
                    <SelectItem value="Ingeniería en Sistemas">Ingeniería en Sistemas</SelectItem>
                    <SelectItem value="Desarrollo de Software">Desarrollo de Software</SelectItem>
                    <SelectItem value="Ingeniería Informática">Ingeniería Informática</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type-filter">Tipo</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="practicante">Practicantes</SelectItem>
                    <SelectItem value="egresado">Egresados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-filter">Estado</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="titulado">Titulado</SelectItem>
                    <SelectItem value="no-titulado">No Titulado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Label className="mb-2 block">Idiomas</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués"].map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={`language-${language}`}
                      checked={filters.languages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                      className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <label
                      htmlFor={`language-${language}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  career: "",
                  type: "",
                  status: "",
                  languages: [],
                })
              }
            >
              Limpiar Filtros
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600" onClick={() => setShowFilters(false)}>
              Aplicar Filtros
            </Button>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {filteredStudents.length} {filteredStudents.length === 1 ? "resultado" : "resultados"} encontrados
          </div>
          <TabsList>
            <TabsTrigger value="grid">Vista de Tarjetas</TabsTrigger>
            <TabsTrigger value="list">Vista de Lista</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-lg font-medium text-amber-700">{student.photo}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {student.career}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    {/* <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{student.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>Experiencia: {student.experience}</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span>{student.languages.join(", ")}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-amber-50 text-amber-700 hover:bg-amber-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button asChild className="w-full bg-amber-500 hover:bg-amber-600">
                    <a href={`/company-dashboard/students/${student.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      Ver Perfil Completo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-amber-700">{student.photo}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5" />
                            {student.career}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span>{student.location}</span>
                          <span className="hidden md:inline">•</span>
                          <span>Exp: {student.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden md:flex flex-wrap gap-1 mr-4">
                        {student.skills.slice(0, 2).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-amber-50 text-amber-700 hover:bg-amber-100"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {student.skills.length > 2 && (
                          <Badge variant="outline" className="text-muted-foreground">
                            +{student.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button asChild className="bg-amber-500 hover:bg-amber-600">
                        <a href={`/company-dashboard/students/${student.id}`}>Ver Perfil</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

