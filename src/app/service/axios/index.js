'use client';
import axios from 'axios'


const isLocalhost = "http://localhost:5000"

const SERVER_URL = isLocalhost
  ? "http://localhost:5000"
  : "http://api.sse.techfortified.com";

export const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

export const STREAM_URL = `${SERVER_URL}/stream`;

export const ssEvents = new EventSource(STREAM_URL, { withCredentials: true });
