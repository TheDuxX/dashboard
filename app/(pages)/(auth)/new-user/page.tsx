"use client";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import NavHeader from "@/app/_components/nav-header";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { uploadImage } from "@/supabase/storage/client";
import { signup } from "../actions";
import toast from "react-hot-toast";

export default function NewUser() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setFiles([...files, ...filesArray]);
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleClickUploadImagesButton = () => {
    imageInputRef.current?.click();
  };

  const handleSignup = async (formData: FormData) => {
    startTransition(async () => {
      let avatarUrl = "";
      if (files.length > 0) {
        const { imageUrl, error } = await uploadImage({
          file: files[0],
          bucket: "avatars",
        });

        if (error) {
          console.error("Image upload error:", error);
          return;
        }

        avatarUrl = imageUrl;
      }

      formData.append("avatar", avatarUrl);
      console.log("Form data before signup:", Object.fromEntries(formData.entries()));
      
      try {
        const result = await signup(formData);
        console.log("Signup result:", result);
        toast.success("Signup successful!");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Signup failed!");
      }
    });
  };

  return (
    <>
      <NavHeader />
      <div className="py-4 flex items-center justify-center">
        <form
          className="flex flex-col gap-2 w-[70%] h-full"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSignup(formData);
          }}
        >
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required />
          <Label htmlFor="username">Username:</Label>
          <Input id="username" name="username" type="text" required />
          <Label htmlFor="avatar">Avatar:</Label>
          <input
            type="file"
            ref={imageInputRef}
            hidden
            onChange={handleImageChange}
          />
          <Button type="button" onClick={handleClickUploadImagesButton}>
            Upload Avatar
          </Button>
          <div className="flex gap-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`avatar-${index}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </div>
    </>
  );
}
