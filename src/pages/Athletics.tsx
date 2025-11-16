import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import basketballShot from "@/assets/basketball-shot.png";

const Athletics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Athletics</h1>
            <p className="text-lg text-muted-foreground">
              Competing with passion on and off the court
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>On the Court</CardTitle>
                <CardDescription>Representing SLA Beeber Basketball</CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={basketballShot} 
                  alt="Ethan Hauger shooting a basketball during a game" 
                  className="w-full rounded-lg"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Career Highlights</CardTitle>
                <CardDescription>Key achievements and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-lg mb-1">Best Game Performance</h4>
                  <p className="text-2xl font-bold text-primary">21 Points • 8 Assists</p>
                  <p className="text-sm text-muted-foreground mt-1">School Team</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold text-foreground">185+</p>
                    <p className="text-sm text-muted-foreground">Total Career Points</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold text-foreground">37</p>
                    <p className="text-sm text-muted-foreground">Games Played</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Varsity Team Statistics</CardTitle>
                <CardDescription>Science Leadership Academy - Varsity Basketball</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Season</TableHead>
                        <TableHead className="text-center">Team</TableHead>
                        <TableHead className="text-center">GP</TableHead>
                        <TableHead className="text-center">PPG</TableHead>
                        <TableHead className="text-center">RPG</TableHead>
                        <TableHead className="text-center">APG</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">2024-25 (Jr.)</TableCell>
                        <TableCell className="text-center">Varsity</TableCell>
                        <TableCell className="text-center">6</TableCell>
                        <TableCell className="text-center font-semibold">8.3</TableCell>
                        <TableCell className="text-center">0.0</TableCell>
                        <TableCell className="text-center">0.0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2023-24 (So.)</TableCell>
                        <TableCell className="text-center">Varsity</TableCell>
                        <TableCell className="text-center">22</TableCell>
                        <TableCell className="text-center font-semibold">5.4</TableCell>
                        <TableCell className="text-center">0.8</TableCell>
                        <TableCell className="text-center">0.8</TableCell>
                      </TableRow>
                      <TableRow className="bg-muted/50">
                        <TableCell className="font-bold">Varsity Total</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center font-bold">28</TableCell>
                        <TableCell className="text-center font-bold">6.3</TableCell>
                        <TableCell className="text-center">0.6</TableCell>
                        <TableCell className="text-center">0.6</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JV Team Statistics</CardTitle>
                <CardDescription>Science Leadership Academy - Junior Varsity Basketball</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Season</TableHead>
                        <TableHead className="text-center">Team</TableHead>
                        <TableHead className="text-center">GP</TableHead>
                        <TableHead className="text-center">PPG</TableHead>
                        <TableHead className="text-center">RPG</TableHead>
                        <TableHead className="text-center">APG</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">2022-23 (Fr.)</TableCell>
                        <TableCell className="text-center">JV</TableCell>
                        <TableCell className="text-center">4</TableCell>
                        <TableCell className="text-center font-semibold">11.0</TableCell>
                        <TableCell className="text-center">1.5</TableCell>
                        <TableCell className="text-center">0.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2022-23 (Fr.)</TableCell>
                        <TableCell className="text-center">Varsity</TableCell>
                        <TableCell className="text-center">9</TableCell>
                        <TableCell className="text-center font-semibold">1.8</TableCell>
                        <TableCell className="text-center">1.2</TableCell>
                        <TableCell className="text-center">0.0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AAU Basketball</CardTitle>
                <CardDescription>Travel team performance and development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 bg-primary/10 rounded-lg text-center border-2 border-primary/20">
                    <p className="text-4xl font-bold text-primary mb-2">15</p>
                    <p className="text-sm text-muted-foreground">Points Per Game</p>
                  </div>
                  <div className="p-6 bg-primary/10 rounded-lg text-center border-2 border-primary/20">
                    <p className="text-4xl font-bold text-primary mb-2">5</p>
                    <p className="text-sm text-muted-foreground">Assists Per Game</p>
                  </div>
                  <div className="p-6 bg-primary/10 rounded-lg text-center border-2 border-primary/20">
                    <p className="text-4xl font-bold text-primary mb-2">5</p>
                    <p className="text-sm text-muted-foreground">Rebounds Per Game</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Athletics;
