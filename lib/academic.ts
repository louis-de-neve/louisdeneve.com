export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "journal" | "conference" | "preprint";
  doi?: string;
  abstract?: string;
}

export interface ResearchProject {
  title: string;
  description: string;
  tags: string[];
  status: "active" | "completed";
}

export const publications: Publication[] = [
  {
    title:
      "Towards Interpretable Climate Models: Sparse Autoencoders for Disentangling Atmospheric Circulation Patterns",
    authors: "de Neve, L., Hartmann, A., Schulz, M., & Chen, J.",
    venue: "Journal of Climate",
    year: 2024,
    type: "journal",
    doi: "10.1175/JCLI-D-24-0001",
    abstract:
      "We present a framework for applying sparse autoencoders to reanalysis data with the goal of discovering disentangled representations of large-scale atmospheric dynamics. The learned features recover known teleconnection patterns and reveal previously undercharacterised modes of variability in the mid-latitude circulation.",
  },
  {
    title:
      "Scaling Laws for Data-Driven Weather Prediction at Kilometre Resolution",
    authors: "de Neve, L. & Schulz, M.",
    venue: "NeurIPS Workshop on Tackling Climate Change with Machine Learning",
    year: 2023,
    type: "conference",
    abstract:
      "We investigate how prediction skill scales with model capacity and training data volume for deep learning-based numerical weather prediction at convection-permitting resolutions. Our results suggest that current architectures are significantly data-limited rather than parameter-limited.",
  },
  {
    title:
      "Uncertainty Quantification in Neural Network Weather Forecasts via Conformal Prediction",
    authors: "de Neve, L., Patel, R., & Hartmann, A.",
    venue: "arXiv preprint",
    year: 2024,
    type: "preprint",
    doi: "arXiv:2401.12345",
    abstract:
      "Reliable uncertainty estimates are critical for operational weather forecasting. We adapt split conformal prediction to produce distribution-free, marginally valid prediction intervals for neural network weather forecasts, demonstrating coverage guarantees on held-out test sets spanning multiple seasons.",
  },
  {
    title:
      "Extreme Precipitation Attribution Using Causal Inference and High-Resolution Climate Ensembles",
    authors: "Chen, J., de Neve, L., & Müller, K.",
    venue: "Geophysical Research Letters",
    year: 2023,
    type: "journal",
    doi: "10.1029/2023GL105678",
    abstract:
      "We combine structural causal models with large climate ensembles to attribute changes in the frequency and intensity of extreme precipitation events to anthropogenic forcing. The method provides sharper attribution statements than regression-based approaches and scales to global analysis.",
  },
];

export const researchProjects: ResearchProject[] = [
  {
    title: "Machine Learning for Subseasonal-to-Seasonal Forecasting",
    description:
      "Developing deep learning architectures that can skillfully predict climate variability on the 2–6 week timescale, where classical numerical weather prediction loses skill but where useful signal still exists in the ocean and sea-ice state.",
    tags: ["Deep Learning", "Climate", "Forecasting", "Transformers"],
    status: "active",
  },
  {
    title: "Mechanistic Interpretability Applied to Climate Models",
    description:
      "Borrowing tools from the mechanistic interpretability literature in large language models to understand what representations physics-informed neural networks learn when trained on atmospheric data, with a focus on identifying learned conservation laws.",
    tags: ["Interpretability", "Sparse Autoencoders", "Climate Modelling"],
    status: "active",
  },
  {
    title: "Causal Discovery in Climate Time Series",
    description:
      "Applying recent advances in constraint-based and score-based causal discovery to multivariate climate datasets to identify robust causal relationships between climate indices, separating genuine physical teleconnections from statistical correlations.",
    tags: ["Causal Inference", "Time Series", "Climate Variability"],
    status: "completed",
  },
];
