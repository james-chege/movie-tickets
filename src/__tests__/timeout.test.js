import { renderHook } from "@testing-library/react-hooks";
import { useTimeout } from "../helpers/useTimeout";
import { act as acting } from "@testing-library/react";

test('should wait for user to type', async () => {
    const { result } = renderHook(
        () => useTimeout(() => null, 2, 1));
    await acting(() => new Promise((r) => setTimeout(r, 1)));
    expect(result.error).toBe(undefined);
})
