import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";
import { useAuth } from "../contexts/AuthContext";
import Error from "../components/Error";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  function errorMessage(error) {
    console.log(error);

    if (error.code === "auth/wrong-password") {
      return "Incorrect password!";
    } else if (error.code === "auth/email-already-exists") {
      return "This email already exists.";
    } else if (error.code === "auth/user-not-found") {
      return "That user does not exist.";
    } else {
      return "Error";
    }
  }

  async function handleSubmit() {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return setError("Please fill out all fields.");
    } else {
      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (password !== confirmPassword) {
        return setError("Passwords don't match.");
      }
      if (!emailReg.test(email)) {
        return setError("Invalid Email");
      }

      try {
        setError("");
        await signup(email, password);
        navigation.navigate("Dash");
      } catch (error) {
        setError(errorMessage(error));
      }
    }
  }

  return (
    <>
      <Header title="Signup" subtitle="Create a TaskBuddy account" />
      <Form>
        {error ? <Error errorMsg={error} /> : []}
        <Input
          placeholder="Email.."
          password={false}
          type="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password.."
          password={true}
          type="default"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Confirm Password.."
          password={true}
          type="default"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button
          text="Sign Up"
          bg="#ff4b2b"
          color="#fff"
          onPress={handleSubmit}
        />
        <Button
          text="Have an account? Log in"
          bg="#fff"
          color="#ff4b2b"
          onPress={() => navigation.navigate("Login")}
        />
      </Form>
    </>
  );
}
