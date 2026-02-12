/**
 * Reusable Card component
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.price
 * @param {string[]} props.features
 * @param {string} [props.description]
 * @param {boolean} [props.featured]
 * @param {string} [props.ctaLabel]
 * @param {string} [props.ctaHint]
 */
function Card(props) {
  const {
    title,
    price,
    features,
    description = "",
    featured = false,
    ctaLabel = "Start trial",
    ctaHint = ""
  } = props;

  const article = document.createElement("article");
  article.className = "pricing-card" + (featured ? " pricing-card--featured" : "");
  article.setAttribute("tabindex", "-1");
  article.setAttribute("aria-label", title + " plan");

  const header = document.createElement("header");
  header.className = "pricing-card-header";

  const titleBlock = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.className = "card-title";
  h2.textContent = title;

  const desc = document.createElement("p");
  desc.className = "card-description";
  desc.textContent = description;

  titleBlock.appendChild(h2);
  if (description) {
    titleBlock.appendChild(desc);
  }

  header.appendChild(titleBlock);

  if (featured) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = "Most popular";
    header.appendChild(badge);
  }

  const priceRow = document.createElement("div");
  priceRow.className = "price-row";

  const priceAmount = document.createElement("span");
  priceAmount.className = "price-amount";
  priceAmount.textContent = price;

  const pricePeriod = document.createElement("span");
  pricePeriod.className = "price-period";
  pricePeriod.textContent = "/ month";

  priceRow.appendChild(priceAmount);
  priceRow.appendChild(pricePeriod);

  const featuresHeading = document.createElement("p");
  featuresHeading.className = "features-heading";
  featuresHeading.textContent = "What’s included";

  const list = document.createElement("ul");
  list.className = "features";

  features.forEach(function (item) {
    const li = document.createElement("li");

    const icon = document.createElement("span");
    icon.className = "feature-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✓";

    const text = document.createElement("span");
    text.textContent = item;

    li.appendChild(icon);
    li.appendChild(text);
    list.appendChild(li);
  });

  const footer = document.createElement("footer");
  footer.className = "pricing-card-footer";

  const button = document.createElement("button");
  button.className = featured ? "btn" : "btn btn-secondary";
  button.type = "button";
  button.setAttribute("aria-label", ctaLabel + " for the " + title + " plan");

  button.addEventListener("click", function () {
    const message = "You chose the " + title + " plan at " + price + " per month.";
    alert(message);
  });

  const labelSpan = document.createElement("span");
  labelSpan.textContent = ctaLabel;

  const iconSpan = document.createElement("span");
  iconSpan.className = "icon";
  iconSpan.setAttribute("aria-hidden", "true");
  iconSpan.textContent = "→";

  button.appendChild(labelSpan);
  button.appendChild(iconSpan);

  footer.appendChild(button);

  if (ctaHint) {
    const hint = document.createElement("p");
    hint.className = "helper-text";
    hint.textContent = ctaHint;
    footer.appendChild(hint);
  }

  article.appendChild(header);
  article.appendChild(priceRow);
  article.appendChild(featuresHeading);
  article.appendChild(list);
  article.appendChild(footer);

  return article;
}

// Render example cards into the pricing grid
function renderPricing() {
  const grid = document.querySelector(".pricing-grid");
  if (!grid) return;

  const plans = [
    {
      title: "Basic",
      price: "$9.99",
      description: "Get started with essential tools for solo projects.",
      features: ["1 GB secure storage", "Basic email support", "Access to core workflows"],
      ctaLabel: "Start basic trial",
      ctaHint: "Perfect for quick experiments and personal use."
    },
    {
      title: "Pro",
      price: "$19.99",
      description: "For growing teams that need more power.",
      features: [
        "10 GB secure storage",
        "Priority support",
        "Advanced automation rules",
        "Shared team workspaces"
      ],
      featured: true,
      ctaLabel: "Choose Pro",
      ctaHint: "Most teams start here and scale over time."
    },
    {
      title: "Business",
      price: "$39.99",
      description: "Full control, reporting, and security for companies.",
      features: [
        "Unlimited projects",
        "Audit logs & analytics",
        "SSO & advanced permissions",
        "Dedicated success manager"
      ],
      ctaLabel: "Talk to sales",
      ctaHint: "We’ll help you design the right rollout for your org."
    }
  ];

  plans.forEach(function (plan) {
    grid.appendChild(Card(plan));
  });
}

// Initialize when the DOM is ready
document.addEventListener("DOMContentLoaded", renderPricing);
