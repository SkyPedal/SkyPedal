import { useState, useMemo, useCallback } from "react";
import today from "../../utils/today";

const useFormData = () => {
  const defaultData = useMemo(() => {
    return {
      title: "Commute to Work",
      date: today(),
      time: "08:00",
      start: "none",
      end: "none",
      distance: 0,
      duration: 0,
      geoJson: null,
    };
  }, []);

  const [formData, setFormData] = useState({ ...defaultData });

  const setField = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [setFormData],
  );

  const resetForm = useCallback(
    () => setFormData({ ...defaultData }),
    [defaultData, setFormData],
  );

  const memoizedReturn = useMemo(() => {
    return {
      data: formData,
      set: setFormData,
      setField,
      reset: resetForm,
    };
  }, [formData, setFormData, setField, resetForm]);
  return memoizedReturn;
};

export default useFormData;
