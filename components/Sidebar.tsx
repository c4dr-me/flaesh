import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import { Edit, Trash, Route, CalendarHeart, Save } from "lucide-react";
import { useState, Suspense } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

const SidebarMenuItemSkeleton = () => (
  <SidebarMenuItem className="bg-transparent h-full flex justify-between items-center p-3 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg cursor-pointer shadow-lg animate-pulse">
    <div className="flex items-center space-x-3 w-full">
      <Skeleton className="h-5 w-5 bg-gray-600 rounded-full"></Skeleton>
      <Skeleton className="h-4 w-3/4 bg-gray-600 rounded"></Skeleton>
    </div>
    <div className="flex space-x-3 pl-2">
      <Skeleton className="h-5 w-5 bg-green-400 rounded-full"></Skeleton>
      <Skeleton className="h-5 w-5 bg-red-400 rounded-full"></Skeleton>
    </div>
  </SidebarMenuItem>
);

interface SidebarComponentProps {
  isSidebarOpen: boolean;
  savedItems: { id: number; name: string; type: "roadmap" | "flashcard" }[];
  loading: boolean;
  onEdit: (id: number, newName: string, type: "roadmap" | "flashcard") => void;
  onDelete: (id: number, type: "roadmap" | "flashcard") => void;
  onItemClick: (id: number, type: "roadmap" | "flashcard") => void;
}

export default function SidebarComponent({
  isSidebarOpen,
  savedItems,
  loading,
  onEdit,
  onDelete,
  onItemClick,
}: SidebarComponentProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (
    id: number,
    currentName: string,
    type: "roadmap" | "flashcard"
  ) => {
    onEdit(id, currentName, type);
    setEditingItemId(id);
    setNewName(currentName);
  };

  const handleSaveEdit = (id: number, type: "roadmap" | "flashcard") => {
    onEdit(id, newName, type);
    setEditingItemId(null);
  };

  const handleBlur = (id: number, type: "roadmap" | "flashcard") => {
    onEdit(id, newName, type);
    setEditingItemId(null);
  };

  const handleDeleteClick = (id: number, type: "roadmap" | "flashcard") => {
    console.log(`Deleting Item - ID: ${id}, Type: ${type}`);
    onDelete(id, type);
    setDeleteItemId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId !== null) {
      onDelete(deleteItemId);
      setDeleteItemId(null);
      setOpenDialog(false);
    }
  };

  return (
    <Sidebar
      className={`w-64 text-white ${isSidebarOpen ? "block" : "hidden"}`}
    >
      <SidebarContent>
        <div className="p-4">
          {isLoaded && isSignedIn ? (
            <div className="mb-4">
              <Link href="/dashboard">
                <Button className="px-4 w-full py-2 bg-gradient-to-br from-transparent via-black to-[rgba(241,144,54,0.1)] bg-opacity-30 text-white rounded border-2 border-red-800/30 backdrop-filter backdrop-blur-lg hover:bg-opacity-50 hover:shadow-[5px_5px_0px_0px_rgb(138,38,38)] transition duration-300">
                  <LayoutDashboard className="mr-2" />
                  {`Welcome, ${user.firstName}`}
                </Button>
              </Link>
            </div>
          ) : (
            <Skeleton className="w-full h-10 rounded bg-gray-800"/>
          )}

          <div className="mt-6">
            <div>
              <h3 className=" bg-black text-sm font-semibold text-gray-300 text-center">
                Saved Roadmaps & Flashcards
              </h3>
              <div className="w-48 h-[3px] mx-auto mt-2 bg-gray-600 rounded-xl"></div>
            </div>

            {loading ? (
              <ul className="space-y-2 mt-4">
                {[...Array(10)].map((_, index) => (
                  <SidebarMenuItemSkeleton key={index} />
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 mt-4">
                {savedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <SidebarMenuItem
                      className="bg-transparent flex justify-between items-center p-3 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg  cursor-pointer shadow-lg"
                      style={{
                        background: "rgba(157, 70, 18, 0.15)",
                        boxShadow: "0 8px 32px 0 rgba(235,101,101,0.15)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                      }}
                      onClick={() => onItemClick(item.id, item.type)}
                    >
                      {editingItemId === item.id ? (
                        <div className="flex items-center w-full space-x-1 h-full">
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={() => handleBlur(item.id, item.type)}
                            className="p-2 w-full text-white rounded-lg h-full"
                            style={{
                              minHeight: "30px",
                              background: "rgba(157, 70, 18, 0.15)",
                            }}
                          />
                          <Save
                            onClick={() => handleSaveEdit(item.id, item.type)}
                            aria-label={`Save ${item.name}`}
                            className="w-6 h-100% text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-1 rounded-full hover:bg-gradient-to-l cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 w-full">
                          {item.type === "roadmap" ? (
                            <button
                              className="w-5 h-5 text-gray-400"
                              aria-label="Roadmap"
                              title="Roadmap"
                            >
                              <Route size={18} />
                            </button>
                          ) : (
                            <button
                              className="w-5 h-5 text-gray-400"
                              aria-label="Flashcard"
                              title="Flashcards"
                            >
                              <CalendarHeart size={18} />
                            </button>
                          )}
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                      )}
                      {!editingItemId && (
                        <div className="flex space-x-3">
                          <Edit
                            className="w-5 h-5 text-green-300 hover:text-green-400 cursor-pointer"
                            onClick={() =>
                              handleEditClick(item.id, item.name, item.type)
                            }
                            aria-label={`Edit ${item.name}`}
                          />
                          <Trash
                            className="w-5 h-5 text-red-200 hover:text-red-300 cursor-pointer"
                            onClick={() =>
                              handleDeleteClick(item.id, item.type)
                            }
                            aria-label={`Delete ${item.name}`}
                          />
                        </div>
                      )}
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="flex justify-end p-4">
        {loading ? (
      <Skeleton className="w-10 h-10 bg-gray-600 rounded-full" />
         ):( <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10",
            },
          }}
        />
  )}
      </SidebarFooter>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-black text-white rounded-lg p-4">
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="text-white bg-black"
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
