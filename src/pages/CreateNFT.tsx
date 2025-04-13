
import { useState } from "react";
import { Layout } from "@/components/layout";
import { AddressDisplay } from "@/components/address-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Image, Loader2, Plus, Upload, X } from "lucide-react";

export default function CreateNFT() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1500);
  };

  const addCollaborator = () => {
    if (!newCollaborator || collaborators.includes(newCollaborator)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid and unique wallet address.",
      });
      return;
    }

    setCollaborators([...collaborators, newCollaborator]);
    setNewCollaborator("");
  };

  const removeCollaborator = (address: string) => {
    setCollaborators(collaborators.filter((c) => c !== address));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !selectedImage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields and upload an image.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "NFT Created",
        description: "Your NFT has been created successfully!",
      });
      
      // Clear form
      setTitle("");
      setDescription("");
      setSelectedImage(null);
      setCollaborators([]);
    }, 2000);
  };

  return (
    <Layout>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create NFT</h1>
            <p className="text-muted-foreground">Upload your artwork and mint your NFT</p>
          </div>
          
          <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={!selectedImage || !title}
              >
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>NFT Preview</DialogTitle>
                <DialogDescription>This is how your NFT will appear in the marketplace.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                {selectedImage && (
                  <div className="rounded-md overflow-hidden w-full">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div className="text-center w-full">
                  <h3 className="font-bold text-xl">{title || "Untitled NFT"}</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    {description || "No description provided."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {collaborators.map((address, i) => (
                    <AddressDisplay key={i} address={address} size="sm" />
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Image</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedImage ? (
                  <div className="relative rounded-md overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="w-full h-auto object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      {isUploading ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                          <p className="text-muted-foreground">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Image className="h-8 w-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="font-medium">Click to upload</p>
                            <p className="text-xs text-muted-foreground">
                              SVG, PNG, JPG or GIF (Max 10MB)
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="file-upload"
                            onChange={handleImageUpload}
                          />
                          <Label
                            htmlFor="file-upload"
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md cursor-pointer text-sm"
                          >
                            Upload Image
                          </Label>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>NFT Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter the title of your NFT"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your NFT..."
                      className="min-h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Collaborators</Label>
                      <span className="text-xs text-muted-foreground">
                        {collaborators.length} collaborator{collaborators.length !== 1 && 's'} added
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Enter wallet address (0x...)"
                        value={newCollaborator}
                        onChange={(e) => setNewCollaborator(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addCollaborator}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {collaborators.map((address, i) => (
                        <div
                          key={i}
                          className="flex items-center rounded-md bg-secondary px-2 py-1 gap-1"
                        >
                          <AddressDisplay address={address} size="sm" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => removeCollaborator(address)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="min-w-32"
                      disabled={isSubmitting || !title || !description || !selectedImage}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Minting...
                        </>
                      ) : (
                        <>
                          Mint NFT
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
