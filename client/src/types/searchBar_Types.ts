import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { CitySuggestion } from "../types/locationTypes";

export interface Props {
  suggestions: CitySuggestion[];
  onSelect: (location: CitySuggestion) => void;
  onChange: (query: string) => void;
  onSubmit: (query: string) => void;
  disabled?: boolean;
}