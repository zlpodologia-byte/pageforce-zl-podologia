import { expect, test } from "@playwright/test";

test.describe("ZL client checklist 2026-04-26", () => {
  test("publishes the client-requested clinical copy and safeguards", async ({
    page,
  }) => {
    const verification = await page.request.get(
      "/googleed77e9ab4edd9965.html"
    );
    expect(verification.ok()).toBe(true);
    expect((await verification.text()).trim()).toBe(
      "google-site-verification: googleed77e9ab4edd9965.html"
    );

    await page.goto("/");

    const body = page.locator("body");

    await expect(body).toContainText(
      "Tratamento especializado para a saúde dos seus pés"
    );
    await expect(body).toContainText("Podologia clínica em Fortaleza");
    await expect(body).toContainText("Estou com dor");
    await expect(body).toContainText("Quero tratar fungos");
    await expect(body).toContainText("Quero manutenção");
    await expect(body).toContainText("Falar no WhatsApp");
    await expect(body).toContainText("Onicocriptose (unha encravada)");
    await expect(body).toContainText("Órtese ungueal (anteparos)");
    await expect(body).toContainText("Onicomicose (fungos)");
    await expect(body).toContainText("Tratamento para eliminar fungos");
    await expect(body).toContainText("Auxilia no tratamento de fungos e inflamações");
    await expect(body).toContainText("Verruga plantar");
    await expect(body).toContainText("Tungíase (Bicho de pé)");
    await expect(body).toContainText("Reflexologia podal (Relaxante e terapêutica)");
    await expect(body).toContainText("Técnica suave que promove relaxamento e alívio do estresse");
    await expect(body).toContainText("Estimulação de pontos específicos para equilíbrio e bem-estar do organismo");
    await expect(body).toContainText("Jannié atua como reflexoterapeuta podal");
    await expect(body).toContainText("Grau 1: a partir de R$ 150");
    await expect(body).toContainText("Graus 2 e 3: a partir de R$ 200");
    await expect(body).toContainText("Imagens meramente ilustrativas.");
    await expect(body).toContainText("Seu plano de cuidado personalizado");
    await expect(body).toContainText("Registro clínico autorizado");
    await expect(
      page.getByAltText(/Registro autorizado de caso de fungos nas unhas/)
    ).toBeVisible();

    await expect(body).not.toContainText("pedicure");
    await expect(body).not.toContainText("R$ 69");
    await expect(body).not.toContainText("Avaliação inicial");
    await expect(body).not.toContainText("Jannie");
    await expect(body).not.toContainText("podólogas");
    await expect(body).not.toContainText("Remoção de verruga plantar");
    await expect(body).not.toContainText("Unha encravada / Órtese");
    await expect(body).not.toContainText("Podoprofilaxia / Reflexologia");
  });
});
