import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";

export default function ClickableWrapper({ type, as, url, onClick, children }) {
  return (
    <>
      {type === "link" ? (
        <Link href={url} as={as}>
          <Button variant="outlined" color="primary">
            {children}
          </Button>
        </Link>
      ) : (
        <Button variant="outlined" color="primary" onClick={onClick}>
          {children}
        </Button>
      )}
    </>
  );
}
