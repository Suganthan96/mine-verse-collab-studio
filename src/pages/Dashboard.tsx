import { Layout } from "@/components/layout";
import { StatsCard } from "@/components/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Users } from "lucide-react";
import { useEffect, useState } from "react";

const MOCK_NFTS = [
  { id: 1, name: "Pixel Sword #01", image: "https://placehold.co/300x300/44337a/ffffff?text=Pixel+Sword", price: "0.25 ETH", creator: "You" },
  { id: 2, name: "Diamond Block #14", image: "https://placehold.co/300x300/3182ce/ffffff?text=Diamond+Block", price: "0.18 ETH", creator: "You" },
  { id: 3, name: "Emerald Pick #03", image: "https://placehold.co/300x300/2f855a/ffffff?text=Emerald+Pick", price: "0.30 ETH", creator: "You" },
  { id: 4, name: "Golden Helmet #07", image: "https://placehold.co/300x300/b7791f/ffffff?text=Golden+Helmet", price: "0.22 ETH", creator: "You" },
  { id: 5, name: "Creeper Art #11", image: "https://placehold.co/300x300/276749/ffffff?text=Creeper+Art", price: "0.15 ETH", creator: "You" },
  { id: 6, name: "Redstone Device #05", image: "https://placehold.co/300x300/c53030/ffffff?text=Redstone+Device", price: "0.27 ETH", creator: "You" },
];

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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your NFT Collection</CardTitle>
            <CardDescription>NFTs you own or have created</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingState === "loading" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-square rounded-md mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {MOCK_NFTS.map((nft) => (
                  <div key={nft.id} className="group">
                    <div className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-black/20 transition-all hover:scale-105">
                      <img 
                        src={nft.image} 
                        alt={nft.name} 
                        className="h-full w-full object-cover transition-all group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div className="text-white">
                          <p className="font-bold text-sm">{nft.name}</p>
                          <p className="text-xs">{nft.price}</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium">{nft.name}</p>
                    <p className="text-xs text-muted-foreground">{nft.price}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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
