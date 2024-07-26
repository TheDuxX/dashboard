"use client";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import NavHeader from "@/app/_components/nav-header";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { uploadImage } from "@/supabase/storage/client";
import { signup } from "../actions";
import toast from "react-hot-toast";
import { PlusIcon, X } from "lucide-react";

export default function NewUser() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
      console.log(
        "Form data before signup:",
        Object.fromEntries(formData.entries())
      );

      try {
        const result = await signup(formData);
        console.log("Signup result:", result);
        toast.success("Criação de usuário bem sucedida!");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Falha na criação de usuário.");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }
    setPasswordError("");
    const formData = new FormData(e.currentTarget);
    handleSignup(formData);
  };

  return (
    <div className="w-full">
      <NavHeader />
      <form
        className="flex flex-col items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="py-4 flex flex-col items-center justify-center w-[70%]">
          <div className="">
            <input
              type="file"
              ref={imageInputRef}
              hidden
              onChange={handleImageChange}
            />
            {imageUrls.length === 0 ? (
              <div
                className="relative w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full border border-solid border-gray-300 cursor-pointer"
                onClick={handleClickUploadImagesButton}
              >
                <PlusIcon className="text-gray-300" />
              </div>
            ) : (
              imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`avatar-${index}`}
                    className=" w-24 h-24 object-cover rounded-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 rounded-full p-0 w-6 h-6 flex items-center justify-center"
                  >
                    <X size={15} />
                  </Button>
                </div>
              ))
            )}
          </div>
          <div className="w-full gap-2 flex flex-col pt-4">
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Nome do usuário"
            />
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
            />
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              placeholder="Confirme a Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="w-full flex flex-col gap-1">
              <Button type="submit" className="">
                Criar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
