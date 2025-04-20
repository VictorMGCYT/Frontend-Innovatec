import { AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WorkInProgressCard() {
  return (
    <Card className="border-amber-500 border-2 w-full ">
      <CardHeader className=" pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-7 w-7 text-amber-500" />
          <CardTitle className="text-amber-500 text-2xl">Trabajo en progreso</CardTitle>
        </div>
        <CardDescription>Esta funcionalidad está en desarrollo</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 bg-white dark:bg-transparent">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="space-y-2">
            <p>Estamos trabajando activamente en implementar esta característica.</p>
            <p className="text-sm text-muted-foreground">
              Gracias por su paciencia mientras completamos el desarrollo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
