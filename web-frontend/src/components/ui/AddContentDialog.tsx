import { useState } from "react";
import { FiX, FiLink, FiType, FiTag } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addContent } from "../../store/features/content";
import type { ContentType } from "../../store/features/content/contentTypes";
import Button from "./Button";
import InputField from "../ui/InputFiled";

interface AddContentDialogProps {
  onClose: () => void;
}

export default function AddContentDialog({ onClose }: AddContentDialogProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.content);

  const [formData, setFormData] = useState({
    link: "",
    type: "article" as ContentType,
    title: "",
    tags: "",
  });

  const [errors, setErrors] = useState({
    link: "",
    title: "",
  });

  const validateForm = () => {
    const newErrors = { link: "", title: "" };
    let isValid = true;

    const linkValue = formData.link.trim();

    if (!linkValue) {
      newErrors.link = "URL is required";
      isValid = false;
    } else if (
      !linkValue.startsWith("http://") &&
      !linkValue.startsWith("https://")
    ) {
      newErrors.link = "Please enter a valid UR";
      isValid = false;
    } else {
      try {
        new URL(linkValue);
      } catch {
        newErrors.link = "Please enter a valid URL";
        isValid = false;
      }
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(
        addContent({
          link: formData.link.trim(),
          type: formData.type,
          title: formData.title.trim(),
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean), // filter the falsy value
        }),
      ).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to add content:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Link</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* url */}
          <InputField
            label="URL"
            name="link"
            type="url"
            placeholder="https://example.com"
            value={formData.link}
            onChange={(e: any) => {
              setFormData({ ...formData, link: e.target.value });
              setErrors({ ...errors, link: "" });
            }}
            icon={<FiLink size={16} />}
            error={errors.link}
            required
            variant="light"
          />

          {/* titile */}
          <InputField
            label="Title"
            name="title"
            type="text"
            placeholder="My awesome link"
            value={formData.title}
            onChange={(e: any) => {
              setFormData({ ...formData, title: e.target.value });
              setErrors({ ...errors, title: "" });
            }}
            icon={<FiType size={16} />}
            error={errors.title}
            required
            variant="light"
          />

          {/*type  */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as ContentType,
                })
              }
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="tweet">Tweet</option>
            </select>
          </div>

          {/* tags */}
          <InputField
            label="Tags"
            name="tags"
            type="text"
            placeholder="tech, programming, react"
            value={formData.tags}
            onChange={(e: any) =>
              setFormData({ ...formData, tags: e.target.value })
            }
            icon={<FiTag size={16} />}
            helperText="Separate with commas"
            variant="light"
          />

          {error && (
            <div className="text-red-600 font-heading text-sm"> {error}</div>
          )}

          {/* add / close */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            />
            <Button
              type="submit"
              text={loading ? "Adding..." : "Add Link"}
              variant="outline"
              className="flex-1"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
