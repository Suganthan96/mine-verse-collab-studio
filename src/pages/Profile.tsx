
import { useState } from "react";
import { Layout } from "@/components/layout";
import { AddressDisplay } from "@/components/address-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Check, Edit, Plus, Trash2, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for collaborators
const MOCK_COLLABORATORS = [
  { id: 1, name: "Aria Digital", address: "0xf3b2c81a48e564a4d060e9985f6720f09f01eb7d", status: "Active", joined: "Apr 2, 2025" },
  { id: 2, name: "BlockMaster", address: "0x94a7e5b3a76e3994ba62f6d4c9c3eff21ae2c623", status: "Pending", joined: "Apr 5, 2025" },
  { id: 3, name: "Crypto Canvas", address: "0x2cb7d1c8dc1e9f0659c883e33a69641de541a824", status: "Active", joined: "Mar 28, 2025" },
];

export default function Profile() {
  const [collaborators, setCollaborators] = useState(MOCK_COLLABORATORS);
  const [newCollabAddress, setNewCollabAddress] = useState("");
  const [newCollabName, setNewCollabName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addCollaborator = () => {
    if (!newCollabAddress || !newCollabName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const newCollab = {
      id: collaborators.length + 1,
      name: newCollabName,
      address: newCollabAddress,
      status: "Pending",
      joined: "Apr 13, 2025",
    };

    setCollaborators([...collaborators, newCollab]);
    setNewCollabAddress("");
    setNewCollabName("");
    setIsDialogOpen(false);

    toast({
      title: "Collaborator Added",
      description: `${newCollabName} has been added as a collaborator.`,
    });
  };

  const removeCollaborator = (id: number) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
    toast({
      title: "Collaborator Removed",
      description: "The collaborator has been removed successfully.",
    });
  };

  const approveCollaborator = (id: number) => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, status: "Active" } : c
    ));
    toast({
      title: "Collaborator Approved",
      description: "The collaborator has been approved.",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and collaborations</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Profile</CardTitle>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-minenft-purple to-minenft-indigo text-lg font-bold">
                  MN
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">MineNFT Artist</h3>
                <p className="text-sm text-muted-foreground">Digital Creator</p>
              </div>
              
              <div className="w-full flex flex-col items-center space-y-2 mt-4">
                <div className="flex items-center justify-center">
                  <AddressDisplay address="0x7c3ea01cd4013125eecd012baf370ba44ed26b85" />
                </div>
                <p className="text-xs text-muted-foreground">Wallet connected Apr 10, 2025</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Collaborators</CardTitle>
                  <CardDescription>Manage your creative partnerships</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Collaborator
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Collaborator</DialogTitle>
                      <DialogDescription>
                        Enter the details of the artist you want to collaborate with.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="collab-name">Name</Label>
                        <Input 
                          id="collab-name" 
                          placeholder="Artist name" 
                          value={newCollabName}
                          onChange={(e) => setNewCollabName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collab-address">Wallet Address</Label>
                        <Input 
                          id="collab-address" 
                          placeholder="0x..." 
                          value={newCollabAddress}
                          onChange={(e) => setNewCollabAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={addCollaborator}>
                        Add Collaborator
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collaborators
                        .filter(c => c.status === "Active")
                        .map((collab) => (
                          <TableRow key={collab.id}>
                            <TableCell>{collab.name}</TableCell>
                            <TableCell>
                              <AddressDisplay address={collab.address} size="sm" />
                            </TableCell>
                            <TableCell>{collab.joined}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCollaborator(collab.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {collaborators.filter(c => c.status === "Active").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No active collaborators found.
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="pending">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Requested</TableHead>
                        <TableHead className="w-[140px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collaborators
                        .filter(c => c.status === "Pending")
                        .map((collab) => (
                          <TableRow key={collab.id}>
                            <TableCell>{collab.name}</TableCell>
                            <TableCell>
                              <AddressDisplay address={collab.address} size="sm" />
                            </TableCell>
                            <TableCell>{collab.joined}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-500 hover:text-green-600"
                                  onClick={() => approveCollaborator(collab.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => removeCollaborator(collab.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  {collaborators.filter(c => c.status === "Pending").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No pending collaboration requests.
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collaborators.map((collab) => (
                        <TableRow key={collab.id}>
                          <TableCell>{collab.name}</TableCell>
                          <TableCell>
                            <AddressDisplay address={collab.address} size="sm" />
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              collab.status === "Active" 
                                ? "bg-green-500/10 text-green-500" 
                                : "bg-amber-500/10 text-amber-500"
                            }`}>
                              {collab.status}
                            </span>
                          </TableCell>
                          <TableCell>{collab.joined}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCollaborator(collab.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
