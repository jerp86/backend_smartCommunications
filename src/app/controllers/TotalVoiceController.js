import TotalVoice from 'totalvoice-node';
import * as Yup from 'yup';

const client = new TotalVoice(process.env.ACCESSTOKEN);

class TotalVoiceController {
  async sms(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      numero_destino: Yup.number()
        .max(11)
        .required(),
      mensagem: Yup.string()
        .max(160)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { numero_destino, mensagem } = req.body;

    client.sms
      .enviar(numero_destino, mensagem)
      .then(data => {
        return res
          .status(data.status)
          .json({ id: data.dados.id, message: data.mensagem });
      })
      .catch(error => {
        return res
          .status(error.data.status)
          .json({ message: error.data.mensagem });
      });
  }

  async tts(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      numero_destino: Yup.number()
        .min(10)
        .max(11)
        .required(),
      mensagem: Yup.string()
        .max(160)
        .required(),
      velocidade: Yup.number()
        .min(-10)
        .max(10)
        .default(1),
      resposta_usuario: Yup.boolean().default(false),
      tipo_voz: Yup.string().default('br-Vitoria'),
      gravar_audio: Yup.boolean().default(false),
      detecta_caixa: Yup.boolean().default(true),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      numero_destino,
      mensagem,
      velocidade,
      resposta_usuario,
      tipo_voz,
      gravar_audio,
      detecta_caixa,
    } = req.body;

    const opcoes = {
      velocidade,
      resposta_usuario,
      tipo_voz,
      gravar_audio,
      detecta_caixa,
    };

    client.tts
      .enviar(numero_destino, mensagem, opcoes)
      .then(data => {
        return res.status(data.status).json(data);
      })
      .catch(error => {
        return res
          .status(error.data.status)
          .json({ message: error.data.mensagem });
      });
  }

  async chamada(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      numero_origem: Yup.number()
        .min(10)
        .max(11)
        .required(),
      numero_destino: Yup.number()
        .min(10)
        .max(11)
        .required(),
      data_criacao: Yup.date().default(new Date()),
      gravar_audio: Yup.boolean().default(false),
      tags: Yup.string().default(''),
      bina_origem: Yup.number().when('numero_origem', (numero_origem, field) =>
        numero_origem
          ? field.required().oneOf([Yup.ref('numero_origem')])
          : field
      ),
      bina_destino: Yup.number().when(
        'numero_destino',
        (numero_destino, field) =>
          numero_destino
            ? field.required().oneOf([Yup.ref('numero_destino')])
            : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { numero_origem, numero_destino, ...options } = req.body;

    client.chamada
      .ligar(numero_origem, numero_destino, options)
      .then(data => {
        return res.status(data.status).json(data);
      })
      .catch(error => {
        return res
          .status(error.data.status)
          .json({ message: error.data.mensagem });
      });
  }
}

export default new TotalVoiceController();
