import axios from "axios";
import { Entry, EntryFormValues, HealthCheckFormValues, Patient, PatientFormValues } from "../../../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: EntryFormValues) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  )
  return data
}

export default {
  getAll, create, createEntry
};

