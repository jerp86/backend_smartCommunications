import TotalVoice from 'totalvoice-node';
import * as Yup from 'yup';

const client = new TotalVoice(process.env.ACCESSTOKEN);

class TotalVoiceController {
  async sms(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      numero_destino: Yup.string()
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
      numero_destino: Yup.string()
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
    const { numero_origem, numero_destino } = req.body;

    client.chamada
      .ligar(numero_origem, numero_destino)
      .then(function(data) {
        console.log(data);
        return res.status(data.status).json(data);
      })
      .catch(function(error) {
        console.error('Erro: ', error);
        return res.status(error.status).json(error);
      });
  }
}

export default new TotalVoiceController();
