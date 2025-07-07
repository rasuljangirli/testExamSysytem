// import React, { useEffect, useRef } from "react";
// import { MathfieldElement } from "mathlive";

// function MathInput({ value, onChange }) {
//   const containerRef = useRef(null);
//   const mathFieldRef = useRef(null);
//   const keepFocusRef = useRef(false);

//   useEffect(() => {
//     const mathField = new MathfieldElement({
//       virtualKeyboardMode: "manual",
//       virtualKeyboardTheme: "material",
//     });

//     mathField.value = value || "";

//     mathField.addEventListener("input", () => {
//       onChange(mathField.getValue("latex"));
//     });

//     // Fokus olarsa klaviaturanı göstər
//     mathField.addEventListener("focus", () => {
//       mathField.executeCommand("showVirtualKeyboard");
//     });

//     // DOM-a əlavə et
//     if (containerRef.current) {
//       containerRef.current.innerHTML = "";
//       containerRef.current.appendChild(mathField);
//       mathFieldRef.current = mathField;
//     }

//     // Daxili klikdə fokus itməsin
//     const handleMouseDown = (e) => {
//       const keyboard = document.querySelector("math-virtual-keyboard");
//       const clickedInsideMathField = mathField.contains(e.target);
//       const clickedInsideKeyboard = keyboard?.contains(e.target);

//       keepFocusRef.current = clickedInsideMathField || clickedInsideKeyboard;
//     };

//     // Fokus çıxanda, əgər klaviaturanın içində deyilsə, blur et
//     const handleFocusOut = () => {
//       if (!keepFocusRef.current) {
//         mathFieldRef.current?.blur();
//       }
//     };

//     document.addEventListener("mousedown", handleMouseDown);
//     mathField.addEventListener("focusout", handleFocusOut);

//     return () => {
//       document.removeEventListener("mousedown", handleMouseDown);
//       mathField.removeEventListener("focusout", handleFocusOut);
//     };
//   }, [value, onChange]);

//   return <div ref={containerRef}></div>;
// }

// export default MathInput;


import React, { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

function MathInput({ value, onChange }) {
  const containerRef = useRef(null);
  const mathFieldRef = useRef(null);

  useEffect(() => {
    const mathField = new MathfieldElement({
      virtualKeyboardMode: "onfocus", // Fokuslandıqda avtomatik açılır
      virtualKeyboardTheme: "material",
    });

    mathField.value = value || "";

    mathField.addEventListener("input", () => {
      onChange(mathField.getValue("latex"));

      // Cursor itməsin deyə inputdan sonra yenidən fokusla
      requestAnimationFrame(() => {
        mathField.focus();
      });
    });

    mathField.addEventListener("focus", () => {
      mathField.executeCommand("showVirtualKeyboard");
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(mathField);
      mathFieldRef.current = mathField;
    }

    return () => {
      mathField.remove();
    };
  }, [value, onChange]);

  return <div ref={containerRef}></div>;
}

export default MathInput;




// import React, { useEffect, useRef } from "react";
// import { MathfieldElement } from "mathlive";

// function MathInput({ value, onChange }) {
//   const containerRef = useRef(null);
//   const mathFieldRef = useRef(null);
//   const preventBlurRef = useRef(false);

//   useEffect(() => {
//     const mathField = new MathfieldElement({
//       virtualKeyboardMode: "manual",
//       virtualKeyboardTheme: "material",
//     });

//     mathField.value = value || "";

//     mathField.addEventListener("input", () => {
//       // Fokus itmesin deyə flag qoyuruq
//       preventBlurRef.current = true;
//       onChange(mathField.getValue("latex"));

//       // 50ms sonra sıfırlayırıq ki, normal çıxış da mümkün olsun
//       setTimeout(() => {
//         preventBlurRef.current = false;
//       }, 50);
//     });

//     // Fokusda olanda klaviaturanı göstər
//     mathField.addEventListener("focus", () => {
//       mathField.executeCommand("showVirtualKeyboard");
//     });

//     // Fokusdan çıxma davranışını nəzarətə alırıq
//     mathField.addEventListener("focusout", (e) => {
//       if (preventBlurRef.current) {
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         mathField.focus(); // Fokusda saxla
//       }
//     });

//     if (containerRef.current) {
//       containerRef.current.innerHTML = "";
//       containerRef.current.appendChild(mathField);
//       mathFieldRef.current = mathField;
//     }

//     return () => {
//       mathField.remove();
//     };
//   }, [value, onChange]);

//   return <div ref={containerRef} />;
// }

// export default MathInput;
