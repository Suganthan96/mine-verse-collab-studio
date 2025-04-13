
import { Layout } from "@/components/layout";
import { StatsCard } from "@/components/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, BarChart4, CircleDollarSign, Image, LineChart, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoadingState("loaded");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your NFTs</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total NFTs"
            value={loadingState === "loading" ? "..." : "54"}
            icon={<Image />}
            description="Across all collections"
          />
          <StatsCard
            title="Collaborations"
            value={loadingState === "loading" ? "..." : "18"}
            icon={<Users />}
            description="With 9 artists"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Revenue"
            value={loadingState === "loading" ? "..." : "Ξ 5.24"}
            icon={<CircleDollarSign />}
            description="Last 30 days"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Growth"
            value={loadingState === "loading" ? "..." : "+24%"}
            icon={<TrendingUp />}
            description="Compared to last month"
          />
        </div>

        <Tabs defaultValue="revenue">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">Last 30 days</div>
          </div>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Your earning performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
                  <LineChart className="h-12 w-12 text-primary opacity-70" />
                  <p className="text-muted-foreground text-center max-w-xs">
                    Chart visualization would appear here showing revenue trends
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="collections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Collection Performance</CardTitle>
                <CardDescription>How your collections are performing</CardDescription>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
                  <BarChart4 className="h-12 w-12 text-primary opacity-70" />
                  <p className="text-muted-foreground text-center max-w-xs">
                    Chart visualization would appear here showing collection metrics
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Analytics</CardTitle>
                <CardDescription>Profile views and engagement</CardDescription>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
                  <ArrowUpRight className="h-12 w-12 text-primary opacity-70" />
                  <p className="text-muted-foreground text-center max-w-xs">
                    Chart visualization would appear here showing visitor trends
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadingState === "loading" ? (
                  <div className="flex flex-col gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 rounded-md animate-pulse bg-muted" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { type: "Sale", title: "Cosmic Dreams #12", amount: "Ξ 1.2", time: "2h ago" },
                      { type: "Collaboration", title: "Project with @stellar-artist", amount: "", time: "6h ago" },
                      { type: "Mint", title: "Crystal Visions Collection", amount: "5 items", time: "1d ago" },
                      { type: "Offer", title: "Digital Echoes #03", amount: "Ξ 0.8", time: "2d ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            item.type === "Sale" ? "bg-green-500" : 
                            item.type === "Collaboration" ? "bg-blue-500" : 
                            item.type === "Mint" ? "bg-purple-500" : "bg-amber-500"
                          }`} />
                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.type} · {item.time}</p>
                          </div>
                        </div>
                        {item.amount && <span className="text-sm font-medium">{item.amount}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Collaborators</CardTitle>
              <CardDescription>Artists you work with most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadingState === "loading" ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 rounded-md animate-pulse bg-muted" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { name: "Aria Digital", address: "0xf3b2c8...", count: 8 },
                      { name: "BlockMaster", address: "0x94a7e5...", count: 6 },
                      { name: "Crypto Canvas", address: "0x2cb7d1...", count: 3 },
                    ].map((collab, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-minenft-purple to-minenft-indigo flex items-center justify-center text-white font-medium">
                            {collab.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{collab.name}</p>
                            <p className="text-xs text-muted-foreground">{collab.address}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                          {collab.count} projects
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
