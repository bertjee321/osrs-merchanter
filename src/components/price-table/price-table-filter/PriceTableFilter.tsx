import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { SubmitButton } from "../../../UI/buttons/SubmitButton";

export const PriceTableFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = React.useState({
    itemName: searchParams.get("itemName") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minVolume: searchParams.get("minVolume") || "",
    minMargin: searchParams.get("minMargin") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    setSearchParams(params);
  };

  const handleReset = () => {
    setFilters({
      itemName: "",
      minPrice: "",
      maxPrice: "",
      minVolume: "",
      minMargin: "",
    });
    setSearchParams({});
  };

  return (
    <Card className="mb-4 shadow-sm p-3">
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="mb-3">
          <Form.Label className="fw-semibold fs-5">🔍 Item Name</Form.Label>
          <Form.Control
            type="text"
            name="itemName"
            value={filters.itemName}
            onChange={handleChange}
          />
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <Form.Label className="small text-muted">Min. price</Form.Label>
            <Form.Control
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <Form.Label className="small text-muted">Max. price</Form.Label>
            <Form.Control
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <Form.Label className="small text-muted">Min. volume</Form.Label>
            <Form.Control
              type="number"
              name="minVolume"
              value={filters.minVolume}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-3 row g-3">
          <div className="col-md-4">
            <Form.Label className="small text-muted">Min. margin</Form.Label>
            <Form.Control
              type="number"
              name="minMargin"
              value={filters.minMargin}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-8 d-flex align-items-end justify-content-end gap-2">
            <SubmitButton />
            <Button variant="outline-secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
};
