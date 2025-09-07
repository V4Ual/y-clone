import Artplayer from "artplayer";
import { useEffect, useRef } from "react";

export default function Player({ option, getInstance, ...rest }) {
  const $container = useRef();

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: $container.current,
    });

    if (typeof getInstance === "function") {
      getInstance(art);
    }

    return () => art.destroy(false);
  }, []);

  return <div ref={$container} {...rest}></div>;
}
