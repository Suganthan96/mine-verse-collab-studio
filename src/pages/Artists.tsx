
import { useState } from "react";
import { Layout } from "@/components/layout";
import { AddressDisplay } from "@/components/address-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Filter, Search, UserPlus } from "lucide-react";

// Mock data for artists
const MOCK_ARTISTS = [
  { id: 1, name: "Digital Dreams", address: "0xf3b2c81a48e564a4d060e9985f6720f09f01eb7d", avatar: "", specialty: "Abstract", joined: "2024" },
  { id: 2, name: "Crypto Canvas", address: "0x2cb7d1c8dc1e9f0659c883e33a69641de541a824", avatar: "", specialty: "Landscape", joined: "2023" },
  { id: 3, name: "Block Brush", address: "0x94a7e5b3a76e3994ba62f6d4c9c3eff21ae2c623", avatar: "", specialty: "Portrait", joined: "2025" },
  { id: 4, name: "Pixel Pioneer", address: "0x3a5e0c5a23f8bf0e11fb7991d2639222d5c47a3c", avatar: "", specialty: "Pixel Art", joined: "2024" },
  { id: 5, name: "Meta Maker", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", avatar: "", specialty: "3D", joined: "2025" },
  { id: 6, name: "Ether Elite", address: "0x7f6852973c3ad8354300975e2eb35880c25acd56", avatar: "", specialty: "Digital", joined: "2023" },
  { id: 7, name: "Virtual Visionary", address: "0x48c8a033be985749c75822ec7f25d5cf5245b953", avatar: "", specialty: "VR", joined: "2024" },
  { id: 8, name: "Token Tracer", address: "0x61ed5ef9da78db78e518a09f803cdd88bc2abca3", avatar: "", specialty: "Animation", joined: "2025" },
];

export default function Artists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredArtists = MOCK_ARTISTS.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    artist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestCollaboration = () => {
    toast({
      title: "Collaboration Request Sent",
      description: `Your request has been sent to ${selectedArtist.name}.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Discover Artists</h1>
            <p className="text-muted-foreground">Find talented artists to collaborate with</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search artists, specialties..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Artists</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Joined</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredArtists.map((artist) => (
                <Card key={artist.id} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-minenft-purple to-minenft-indigo" />
                  <CardContent className="pt-0 relative">
                    <div className="flex justify-center -mt-12 mb-4">
                      <Avatar className="h-20 w-20 border-4 border-background">
                        <AvatarImage src={artist.avatar} />
                        <AvatarFallback className="text-xl bg-secondary">
                          {artist.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      <p className="text-sm text-muted-foreground">{artist.specialty}</p>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <AddressDisplay address={artist.address} size="sm" />
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {artist.joined}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t pt-4">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedArtist(artist);
                        setIsDialogOpen(true);
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Request Collaboration
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No artists found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="py-12 text-center text-muted-foreground">
              Popular artists will be displayed here
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="py-12 text-center text-muted-foreground">
              Recently joined artists will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Collaboration</DialogTitle>
            <DialogDescription>
              Send a collaboration request to {selectedArtist?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedArtist?.avatar} />
                <AvatarFallback className="bg-secondary">
                  {selectedArtist?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedArtist?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedArtist?.specialty}</p>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message (optional)
              </label>
              <textarea
                id="message"
                className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Write a message to introduce yourself..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestCollaboration}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
