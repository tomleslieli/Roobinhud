export const fetchPortfolios = () =>
  $.ajax({
    url: "/api/portfolios",
    method: "GET",
  });

export const createPortfolio = (portfolio) =>
  $.ajax({
    url: "/api/portfolios",
    method: "POST",
    data: { portfolio },
  });

export const updatePortfolio = (portfolio) =>
  $.ajax({
    url: `/api/portfolios/${portfolio.id}`,
    method: "PATCH",
    data: { portfolio },
  });
