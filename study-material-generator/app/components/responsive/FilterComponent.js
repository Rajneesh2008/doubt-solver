import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const FilterComponent = () => {
  const router = useRouter();

  // Separate states for large and small screens
  const [complexity, setComplexity] = useState([]); // Used for large screens (checkboxes)
  const [selectedComplexity, setSelectedComplexity] = useState(""); // Used for small screens (select)
  const [type, setType] = useState("");

  // Initialize state from query parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    const complexities = url.searchParams.getAll("complexity");
    const typeParam = url.searchParams.get("type");

    setComplexity(complexities.length ? complexities : []);
    setSelectedComplexity(complexities[0] || "");
    setType(typeParam || "");
  }, []);

  // Update the URL when complexity (for large screen) or type changes
  useEffect(() => {
    const url = new URL(window.location.href);

    url.searchParams.delete("complexity");
    url.searchParams.delete("type");

    // Add complexity parameters based on screen size
    if (window.innerWidth >= 768) {
      // Assuming 768px is the breakpoint for large screens
      complexity.forEach((item) => {
        url.searchParams.append("complexity", item);
      });
    } else {
      if (selectedComplexity) {
        url.searchParams.set("complexity", selectedComplexity);
      }
    }

    if (type) {
      url.searchParams.set("type", type);
    }

    router.push(url.toString(), { scroll: false });
  }, [complexity, selectedComplexity, type]);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if (name === "complexity") {
      if (window.innerWidth >= 768) {
        // Large screen behavior (checkboxes)
        if (complexity.includes(value)) {
          setComplexity((prev) => prev.filter((item) => item !== value));
        } else {
          setComplexity((prev) => [...prev, value]);
        }
      } else {
        // Small screen behavior (select)
        setSelectedComplexity(value);
      }
    } else if (name === "types") {
      setType(value);
    }
  };

  return (
    <div className="md:hidden flex justify-around items-center">
      <div>
        <select
          name="complexity"
          onChange={handleSelect}
          className="border focus:border-none focus:ring-1 bg-primary
           focus:ring-white mb-4 px-4 py-3 rounded-none shadow-sm text-base text-white w-33 cursor-pointer"
        >
          <option value="">--Select Level--</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
      </div>
      <div>
        <select
          name="types"
          onChange={handleSelect}
          className="border focus:border-none focus:ring-1
           focus:ring-white mb-4 px-4 py-3 bg-primary rounded-none shadow-sm text-base text-white w-33"
        >
          <option value="">--Select Type--</option>
          <option value="summary">Summary</option>
          <option value="quiz">Quiz</option>
          <option value="flashcards">Flash-Cards</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
