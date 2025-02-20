document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".pricing-form");
  const totalEl = document.querySelector(".summary__total");
  const variantTemplate = (num) => `
    <div class="variant-selector__row">
      <span >#${num}</span>
      <div class="select-wrapper">
        <select>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </div>
      <div class="select-wrapper">
        <select>
          <option>Black</option>
          <option>White</option>
        </select>
      </div>
    </div>
  `;

  const updateVariantSelector = (unit, selectorEl) => {
    selectorEl.innerHTML = `
      <div class="variant-selector__header">
        <span></span>
        <span>Size</span>
        <span>Color</span>
      </div>
      ${Array.from({ length: unit }, (_, i) => variantTemplate(i + 1)).join("")}
    `;
  };

  const handleUnitChange = (event) => {
    if (!event.target.matches('input[type="radio"]')) return;

    const unitOption = event.target.closest(".unit-option");
    const variantSelector = unitOption.querySelector(".variant-selector");
    const price = unitOption.querySelector(
      ".unit-option__current-price"
    ).textContent;

    document.querySelectorAll(".variant-selector").forEach((el) => {
      el.classList.add("hidden");
      el.innerHTML = "";
    });

    variantSelector.classList.remove("hidden");
    updateVariantSelector(Number(event.target.value), variantSelector);
    totalEl.textContent = `Total : ${price}`;
  };

  // Initialize default selection
  const initialUnit = document.querySelector('input[type="radio"]:checked');
  if (initialUnit) {
    initialUnit.dispatchEvent(new Event("change", { bubbles: true }));
  }

  form.addEventListener("change", handleUnitChange);
});
