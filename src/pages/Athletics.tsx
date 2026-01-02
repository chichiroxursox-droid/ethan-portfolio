import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import basketballShot from "@/assets/basketball-shot.png";
import { useSectionTheme } from "@/hooks/use-section-theme";

const Athletics = () => {
  useSectionTheme();
  const seasonData = [
    { season: "2022-23 (Fr. JV)", team: "JV", ppg: 11.0, rpg: 1.5, apg: 0.5 },
    { season: "2022-23 (Fr. Var)", team: "Varsity", ppg: 1.8, rpg: 1.2, apg: 0.0 },
    { season: "2023-24 (So.)", team: "Varsity", ppg: 5.4, rpg: 0.8, apg: 0.8 },
    { season: "2024-25 (Jr.)", team: "Varsity", ppg: 8.3, rpg: 0.0, apg: 0.0 },
    { season: "2025-26 (Sr.)*", team: "Varsity", ppg: 14.0, rpg: 0.0, apg: 0.0 },
  ];

  const teamComparisonData = [
    { team: "JV", ppg: 11.0, apg: 0.5, rpg: 1.5 },
    { team: "Varsity", ppg: 6.3, apg: 0.6, rpg: 0.6 },
    { team: "AAU", ppg: 15.0, apg: 5.0, rpg: 5.0 },
  ];

  const chartConfig = {
    ppg: {
      label: "Points Per Game",
      color: "hsl(var(--primary))",
    },
    apg: {
      label: "Assists Per Game",
      color: "hsl(var(--accent))",
    },
    rpg: {
      label: "Rebounds Per Game",
      color: "hsl(var(--secondary))",
    },
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Athletics</h1>
            <p className="text-lg text-muted-foreground">
              I'm not a naturally gifted athlete, but I love basketball. I love seeing improvement over time and watching hard work pay off.
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
                    <p className="text-3xl font-bold text-foreground">295+</p>
                    <p className="text-sm text-muted-foreground">Total Career Points</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-3xl font-bold text-foreground">45</p>
                    <p className="text-sm text-muted-foreground">Games Played</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Season Progression</CardTitle>
                <CardDescription>Points per game evolution throughout high school career</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <LineChart data={seasonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="season" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ppg" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="Points Per Game"
                      dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
                <CardDescription>Average statistics across JV, Varsity, and AAU teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                  <BarChart data={teamComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="team" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="ppg" fill="hsl(var(--primary))" name="Points Per Game" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="apg" fill="hsl(var(--accent))" name="Assists Per Game" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="rpg" fill="hsl(var(--secondary))" name="Rebounds Per Game" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

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
                        <TableCell className="font-medium">2025-26 (Sr.)*</TableCell>
                        <TableCell className="text-center">Varsity</TableCell>
                        <TableCell className="text-center">8</TableCell>
                        <TableCell className="text-center font-semibold">14.0</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center">-</TableCell>
                      </TableRow>
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
                        <TableCell className="text-center font-bold">36</TableCell>
                        <TableCell className="text-center font-bold">8.1</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-center">-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} className="text-xs text-muted-foreground italic pt-4">
                          * Season in progress
                        </TableCell>
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
